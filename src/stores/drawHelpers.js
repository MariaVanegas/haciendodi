import { readable } from "svelte/store";
import * as d3 from 'd3'

const w = 612;
const h = 792;
const divsw = 20;
const sepw = w / divsw;
const divsh = 28;
const seph = h / divsh;

export const units = readable({
  w, h, divsw, sepw, divsh, seph
})

const styling_ = {
  bg: "#ffffff",
  fcol1: "#737373",
  stripcol: "#FFE167",
  arrowcol: "#C6C3B6",
  arrowf: "#737373",
  roundcol: "#737373",
  roundf: "#FFFFFF",
  gridcol: "#efeee9"
}

export const styling = readable(styling_)

function svgText_(cont, text, options) {
  let defaults = {
    bold: false, x: 0, y: 0, fill: styling_.fcol1,
    "font-family": "Archivo Narrow", "text-anchor": "left",
    "font-size": "1em", "alignment-baseline": "bottom"
  }
  Object.assign(defaults, options);
  const fs = v => (sepw * 0.44 * v) / 13;
  const g = cont.append("g")
  const t = g.append("text").text(text)
    .style("font-weight", defaults.bold ? "bold" : "regular")
    .style("font-family", defaults["font-family"])
    .style("fill", defaults.fill)
    .attr("text-anchor", defaults["text-anchor"])
    .attr("font-size", fs(defaults["font-size"]))
    .attr("alignment-baseline", defaults["alignment-baseline"])
    .attr("x", defaults.x)
    .attr("y", defaults.y)

  return t
}
export const svgText = readable(svgText_);

function wrappedText_(maxWidth, cont, text, options) {
  const bs = v => (sepw * 16.5 * v) / 8;
  const lines = [];
  const words = text.split(' ');
  let currentLine = '';
  let currentLineWidth = 0;

  let testLineHeight;
  words.forEach(word => {
    const testLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
    const testLineElement = svgText_(cont, testLine, options);
    const testLineWidth = testLineElement.node().getBBox().width;
    testLineHeight = testLineElement.node().getBBox().height;
    testLineElement.remove();

    if (currentLineWidth + testLineWidth > bs(maxWidth)) {
      lines.push(currentLine);
      currentLine = word;
      currentLineWidth = testLineWidth;
    } else {
      currentLine = testLine;
      currentLineWidth = testLineWidth;
    }
    
  });
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  const sep = testLineHeight * (options.leading || 0.8);
  for (let i = 0; i < lines.length; i++) {
    svgText_(cont, lines[i], {...options, y: options.y !== undefined ? options.y + (i * sep) : i * sep});
  }
}

export const wrappedText = readable(wrappedText_);

function medal_(cont, text, x, y, type = "arrow") {
  const g = cont.append("g").attr("transform", `translate(${x},${y})`);

  const medalw = sepw*2.5;
  const medalh = seph*3;
  const arrowh = seph*2.5;
  const roundh = medalh*0.55;

  const arrowpath = [[0, 0], [medalw, 0], [medalw, arrowh], [medalw/2, medalh], [0, arrowh]];
  const roundpath = [[0, roundh], [0, 0], [medalw, 0], [medalw, roundh]];

  const sides = 30;
  const adivs = Math.PI / sides;
  for (let i = sides + 1; i > 0; i--) {
    const phase = (Math.PI/2);
    const ax = Math.sin((i * adivs) - phase) * (medalw/2);
    const ay = Math.cos((i * adivs) - phase) * (medalw/2);
    roundpath.push([ax + (medalw/2), ay + roundh])
  }
  const line = d3.line()(type === "arrow" ? arrowpath : roundpath);

  g.append("path")
    .attr("d", line)
    .attr("fill", type === "arrow" ? styling_.arrowcol : styling_.roundcol)
    wrappedText_(1.8, g, text, {bold: false, "text-anchor": "middle", y: seph, x: medalw/2, "font-size": 12, "alignment-baseline": "hanging", "fill": type === "arrow" ? styling_.arrowf : styling_.roundf});
}
export const medal = readable(medal_)

// async function setCanvas() {
//   const canvas = document.createElement('canvas')
//   canvas.id = "cnv";
//   d3.select(".overlay-container").node().appendChild(canvas);
//   canvas.width  = w;
//   canvas.height = h;
//   const context = canvas.getContext("2d");

//   const img = new Image();
//   img.src = "assets/matrioska.jpeg";
//   await new Promise(resolve => {
//     img.addEventListener('load',() => {resolve(img)}, false)
//   });

//   context.drawImage(img, 0, 0);
// }




////



// const data2 = {
//   asignatura: "Fundamentos de Tecnología y Comprobación I",
//   autor: "D.I. María Catalina Vanegas Rodríguez",
//   titulo: "Cajitas matrioska",
//   concepto: "Entendiendo los conceptos de proporción y relación a través de un ejercicio de plegado.",
//   claves: "Plegado de papel, origami, superficies desarrollables",
//   contexto: "El plegado es una técnica usada en el diseño estructural de empaques en cartón, como solución en material de comunicación tridimensional e incluso en diseño de indumentaria y de objetos elaborados en lámina metálica. Los principios geométricos aplicados para trazar las cajas planteadas son útiles en la creación de composiciones visuales.",
//   definiciones: "Proporción, relación, polígonos, polígonos regulares, simetría radial, ángulos, paralelas, radio, diámetro, grafado.",
//   requisitos: "Atención. Observación. Precisión. Conocimientos básicos de geometría.",
//   habilidades: "Habilidad visual - espacial. Comprensión geométrica. Precisión en uso de instrumentos de trazado y corte",
//   dificultad: "Básico",
//   competencia: "Habilidades técnicas"
// }