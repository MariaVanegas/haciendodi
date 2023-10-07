<script>
  import { jsPDF } from 'jspdf'

  const w = 612;
  const h = 792;
  const divsw = 20;
  const sepw = w / divsw;
  const divsh = 28;
  const seph = h / divsh;

  const doc = new jsPDF("p", "px", [w, h]);

  let showNumbers = false;

  // ADD FONTS
  // https://rawgit.com/MrRio/jsPDF/master/fontconverter/fontconverter.html

  import { archivoNarrowNormal } from '../stores/Archivo-narrow-normal';
  doc.addFileToVFS('Archivo Narrow-normal.ttf', $archivoNarrowNormal);
  doc.addFont('Archivo Narrow-normal.ttf', 'Archivo Narrow', 'normal');
  doc.setFont('Archivo Narrow');

  import { archivoNarrowBold } from '../stores/Archivo-narrow-bold';
  doc.addFileToVFS('Archivo Narrow-bold.ttf', $archivoNarrowBold);
  doc.addFont('Archivo Narrow-bold.ttf', 'Archivo Narrow', 'bold');
  doc.setFont('Archivo Narrow');

  import 'svg2pdf.js'
  import { onMount } from 'svelte'
  import * as d3 from 'd3'
  import P5 from 'p5-svelte';
  
  let svgElement;
  let canvasElement;
  
  let sketch;

  const styling = {
    bg: "#ffffff",
    fcol1: "#737373",
    stripcol: "#FFE167",
    arrowcol: "#C6C3B6",
    arrowf: "#737373",
    roundcol: "#737373",
    roundf: "#FFFFFF",
    gridcol: "#efeee9"
  }

  const data = {
    curso: "Fundamentos de Tecnología y Comprobación I",
    profe: "D.I. María Catalina Vanegas Rodríguez",
    profe_prev: "Diseño de secuencia",
    titulo: "Cajitas matrioska",
    copy: "Entendiendo los conceptos de proporción y relación a través de un ejercicio de plegado.",
    palabras: "Plegado de papel, origami, superficies desarrollables",
    palabras_prev: "Palabras clave",
    descripcion: "El plegado es una técnica usada en el diseño estructural de empaques en cartón, como solución en material de comunicación tridimensional e incluso en diseño de indumentaria y de objetos elaborados en lámina metálica. Los principios geométricos aplicados para trazar las cajas planteadas son útiles en la creación de composiciones visuales.",
    vocabulario: "Proporción, relación, polígonos, polígonos regulares, simetría radial, ángulos, paralelas, radio, diámetro, grafado.",
    vocabulario_prev: "Vocabulario",
    aplica: "Atención. Observación. Precisión. Conocimientos básicos de geometría.",
    aplica_prev: "El estudiante aplicará",
    mejora: "Habilidad visual - espacial. Comprensión geométrica. Precisión en uso de instrumentos de trazado y corte",
    mejora_prev: "El estudiante mejorará su...",
    nivel: "Básico",
    competencia: "Habilidades técnicas"
  }

  onMount(async ()=> {
    setSvg();
    setSketch();
    // setCanvas();
  })

  function setSketch() {
    sketch = (p5) => {
      let img;
      p5.preload = () => {
        img = p5.loadImage("assets/matrioska.jpeg");
      }
      p5.setup = () => {
        const cnv = p5.createCanvas(w, h).id("canvas");
        cnv.style("z-index", 99)
        p5.stroke("black");
        p5.noFill();
        p5.fill("red");

        const ix = sepw;
        const iy = seph * 8;
        const iw = sepw * 18;
        const ih = seph * 7;
        p5.rect(ix, iy, iw, ih);
        p5.image(img, ix, iy, iw, ih, 0, 0, img.width, img.height, p5.COVER);
        canvasElement = cnv.elt;
      };
    };
  }

  async function setCanvas() {
    const canvas = document.createElement('canvas')
    canvas.id = "cnv";
    d3.select(".overlay-container").node().appendChild(canvas);
    canvas.width  = w;
    canvas.height = h;
    const context = canvas.getContext("2d");

    const img = new Image();
    img.src = "assets/matrioska.jpeg";
    await new Promise(resolve => {
      img.addEventListener('load',() => {resolve(img)}, false)
    });

    context.drawImage(img, 0, 0);
  }

  function setSvg() {
    const svg = d3.select(".overlay-container")
      .append("svg")
      .classed("svg-overlay", true)
      .attr("width", w)
      .attr("height",h)
      .style("position", "absolute")
      .style("border", "solid 1px black")
      .style("z-index", 0)
    svgElement = svg.node();

    grid(svg);
    
    medal(svg, data.nivel, sepw, 0, "arrow");
    medal(svg, data.competencia, sepw*4, 0, "round");

    // Izquierda
    const izquierda = svg.append("g").attr("transform", `translate(${sepw},${0})`);
    wrappedText(10, izquierda, data.descripcion, {bold: false, "text-anchor": "start", y: seph*17, "font-size": 13, "alignment-baseline": "hanging"});

    // Derecha
    const derecha = svg.append("g").attr("transform", `translate(${w - sepw},${0})`);

    svgText(derecha, data.curso, {bold: true, "text-anchor": "end", y: seph + seph*0.4, "font-size": 13});
    svgText(derecha, `${data.profe_prev}: ${data.profe}`, {bold: false, "text-anchor": "end", y: seph*2, "font-size": 13});

    svgText(derecha, data.titulo, {bold: true, "text-anchor": "end", y: seph*4, "font-size": 26});

    wrappedText(8, derecha, data.copy, {bold: false, "text-anchor": "end", y: seph*5, "font-size": 15, "alignment-baseline": "hanging"});

    svgText(derecha, data.palabras_prev, {bold: true, "text-anchor": "end", y: seph*16, "font-size": 13, "alignment-baseline": "hanging"});
    wrappedText(5, derecha, data.palabras, {bold: false, "text-anchor": "end", y: seph*17, "font-size": 13, "alignment-baseline": "hanging"});

    svgText(derecha, data.vocabulario_prev, {bold: true, "text-anchor": "end", y: seph*19, "font-size": 13, "alignment-baseline": "hanging"});
    wrappedText(5, derecha, data.vocabulario, {bold: false, "text-anchor": "end", y: seph*20, "font-size": 13, "alignment-baseline": "hanging"});

    // Franja
    const franja = svg.append("g").attr("transform", `translate(${0},${seph*23})`);
    
    franja.append("rect")
      .attr("x", 0).attr("y", 0)
      .attr("width", w).attr("height", seph * 4)
      .attr("fill", styling.stripcol)
    
    svgText(franja, data.aplica_prev, {bold: true, "text-anchor": "start", y: seph, x: sepw*2, "font-size": 12, "alignment-baseline": "hanging"});
    wrappedText(6, franja, data.aplica, {bold: false, "text-anchor": "start", y: seph*2, x: sepw*2, "font-size": 12, "alignment-baseline": "hanging"});

    franja.append("image")
      .attr("xlink:href", "assets/maletin.svg")
      .attr("width", sepw)
      .attr("height", seph)
      .attr("x", sepw*6)
      .attr("y", seph*0.5)
      .style("opacity", 0.4)

    svgText(franja, data.mejora_prev, {bold: true, "text-anchor": "start", y: seph, x: sepw*11, "font-size": 12, "alignment-baseline": "hanging"});
    wrappedText(6, franja, data.mejora, {bold: false, "text-anchor": "start", y: seph*2, x: sepw*11, "font-size": 12, "alignment-baseline": "hanging"});

    franja.append("image")
      .attr("xlink:href", "assets/escalera.svg")
      .attr("width", sepw)
      .attr("height", seph)
      .attr("x", sepw*16)
      .attr("y", seph*0.5)
      .style("opacity", 0.4)
  }

  function medal(cont, text, x, y, type = "arrow") {
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
      .attr("fill", type === "arrow" ? styling.arrowcol : styling.roundcol)
      wrappedText(1.8, g, text, {bold: false, "text-anchor": "middle", y: seph, x: medalw/2, "font-size": 12, "alignment-baseline": "hanging", "fill": type === "arrow" ? styling.arrowf : styling.roundf});
  }

  function wrappedText(maxWidth, cont, text, options) {
    const bs = v => (sepw * 16.5 * v) / 8;
    const lines = [];
    const words = text.split(' ');
    let currentLine = '';
    let currentLineWidth = 0;

    let testLineHeight;
    words.forEach(word => {
      const testLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
      const testLineElement = svgText(cont, testLine, options);
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
      svgText(cont, lines[i], {...options, y: options.y !== undefined ? options.y + (i * sep) : i * sep});
    }
  }

  function svgText(cont, text, options) {
    let defaults = {
      bold: false, x: 0, y: 0, fill: styling.fcol1,
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

  function grid(cont) {
    const g = cont.append("g");
    for (let i = 0; i < divsw; i++) {
      const x = i * sepw;

      g.append("line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", 0)
        .attr("y2", h)
        .attr("stroke", styling.gridcol)

      if (showNumbers) {
        g.append("text")
        .attr("x", x + (sepw/2))
        .attr("y", seph/2)
        .attr("text-anchor","middle")
        .text(i + 1)
        .attr("fill", styling.gridcol)
      }
    }
    for (let i = 0; i < divsh; i++) {
      const y = i * seph;
      g.append("line")
        .attr("y1", y)
        .attr("y2", y)
        .attr("x1", 0)
        .attr("x2", w)
        .attr("stroke", styling.gridcol)
        .attr("stroke-width", 0.5)
      
      if (showNumbers) {
        g.append("text")
        .attr("x", sepw/2)
        .attr("y", y + (seph/2))
        .attr("text-anchor","middle")
        .text(i + 1)
        .attr("fill", styling.gridcol)
        .attr("stroke-width", 0.5)
      }
    }

    const clip = cont.append("mask").attr("id","window");
    const ix = sepw;
    const iy = seph * 8;
    const iw = sepw * 18;
    const ih = seph * 7;
    clip.append("rect").attr("x", 0).attr("y", 0).attr("width", "100%").attr("height", "100%").attr("fill", "white");
    clip.append("rect").attr("x", ix - 2).attr("y", iy - 2).attr("width", iw + 1).attr("height", ih + 1).attr("fill", "black");
    g.attr("mask", "url(#window)");
  }

  async function addPage() {
    await doc.svg(svgElement, { x: 0, y: 0, width: w, height: h});
    doc.addImage(canvasElement, 'PNG', 0, 0, w, h, "canvas");
  }

  async function exportPdf() {
    await addPage();
    doc.save('certificado.pdf');
  }
</script>


<div class="overlay-container" id="overlay-container">
  {#if sketch} <P5 {sketch} /> {/if}
</div>
<button on:click={exportPdf}>EXPORTAR</button>

<style>
  .overlay-container {
    position: relative;
  }
</style>