
const fs = require("fs");

const origen = "output/plutotv_us.m3u8";
const destino = "output/plutotv_us_latino.m3u8";

const contenido = fs.readFileSync(origen, "utf8");
const lineas = contenido.split(/\r?\n/);

const palabras = [
  "spanish", "español", "espanol",
  "latino", "latina", "latinx",
  "en español", "en espanol",
  "novelas", "telenovelas",
  "crímenes imperfectos", "crimenes imperfectos"
];

const seleccionados = ["#EXTM3U"];
let cantidad = 0;

for (let i = 0; i < lineas.length; i++) {
  const linea = lineas[i];

  if (!linea.startsWith("#EXTINF:")) continue;

  const texto = linea.toLowerCase();

  if (palabras.some(p => texto.includes(p))) {
    seleccionados.push(linea);

    if (lineas[i + 1]) {
      seleccionados.push(lineas[i + 1]);
    }

    cantidad++;
  }
}

fs.writeFileSync(
  destino,
  seleccionados.join("\n") + "\n",
  "utf8"
);

console.log("Canales seleccionados:", cantidad);
