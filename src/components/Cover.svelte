<script>
  import { units, styling, svgText, wrappedText, medal } from "../stores/drawHelpers";
  import 'svg2pdf.js'
  import { onMount } from 'svelte'
  import * as d3 from 'd3'
  import P5 from 'p5-svelte';

  const { w, h, divsw, sepw, divsh, seph } = $units;
  export let svgElement = undefined;
  export let canvasElement = undefined;
  export let data;

  let sketch;
  let showNumbers = false;

  let overlayContainer;

  onMount(async ()=> {
    setSvg();
    setSketch();
  })

  function setSketch() {
    sketch = (p5) => {
      let img;
      p5.preload = () => {
        // img = p5.loadImage("assets/matrioska.jpeg");
        img = p5.loadImage(data.imagenUrl);
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

  function setSvg() {
    coverLayoutSvg();
  }

  function coverLayoutSvg() {
    const svg = d3
      .select(overlayContainer)
      .append("div")
      .append("svg")
      .classed("svg-overlay", true)
      .attr("width", w)
      .attr("height",h)
      .style("position", "absolute")
      .style("border", "solid 1px black")
      .style("z-index", 0)
    svgElement = svg.node();

    grid(svg);
    
    $medal(svg, data.dificultad, sepw, 0, "arrow");
    $medal(svg, data.competencia, sepw*4, 0, "round");

    // Izquierda
    const izquierda = svg.append("g").attr("transform", `translate(${sepw},${0})`);
    $wrappedText(10, izquierda, data.contexto, {bold: false, "text-anchor": "start", y: seph*17, "font-size": 13, "alignment-baseline": "hanging"});

    // Derecha
    const derecha = svg.append("g").attr("transform", `translate(${w - sepw},${0})`);

    $svgText(derecha, data.asignatura, {bold: true, "text-anchor": "end", y: seph + seph*0.4, "font-size": 13});
    $svgText(derecha, `Diseño de secuencia: ${data.autor}`, {bold: false, "text-anchor": "end", y: seph*2, "font-size": 13});

    $svgText(derecha, data.titulo, {bold: true, "text-anchor": "end", y: seph*4, "font-size": 26});

    $wrappedText(8, derecha, data.concepto, {bold: false, "text-anchor": "end", y: seph*5, "font-size": 15, "alignment-baseline": "hanging"});

    $svgText(derecha, "Palabras clave", {bold: true, "text-anchor": "end", y: seph*16, "font-size": 13, "alignment-baseline": "hanging"});
    $wrappedText(5, derecha, data.claves, {bold: false, "text-anchor": "end", y: seph*17, "font-size": 13, "alignment-baseline": "hanging"});

    $svgText(derecha, "Vocabulario", {bold: true, "text-anchor": "end", y: seph*19, "font-size": 13, "alignment-baseline": "hanging"});
    $wrappedText(5.5, derecha, data.definiciones, {bold: false, "text-anchor": "end", y: seph*20, "font-size": 13, "alignment-baseline": "hanging"});

    // Franja
    const franja = svg.append("g").attr("transform", `translate(${0},${seph*23})`);
    
    franja.append("rect")
      .attr("x", 0).attr("y", 0)
      .attr("width", w).attr("height", seph * 4)
      .attr("fill", $styling.stripcol)
    
    $svgText(franja, "El estudiante aplicará", {bold: true, "text-anchor": "start", y: seph, x: sepw*2, "font-size": 12, "alignment-baseline": "hanging"});
    $wrappedText(6, franja, data.requisitos, {bold: false, "text-anchor": "start", y: seph*2, x: sepw*2, "font-size": 12, "alignment-baseline": "hanging"});

    franja.append("image")
      .attr("xlink:href", "assets/maletin.svg")
      .attr("width", sepw)
      .attr("height", seph)
      .attr("x", sepw*6)
      .attr("y", seph*0.5)
      .style("opacity", 0.4)

    $svgText(franja, "El estudiante mejorará su...", {bold: true, "text-anchor": "start", y: seph, x: sepw*11, "font-size": 12, "alignment-baseline": "hanging"});
    $wrappedText(6, franja, data.habilidades, {bold: false, "text-anchor": "start", y: seph*2, x: sepw*11, "font-size": 12, "alignment-baseline": "hanging"});

    franja.append("image")
      .attr("xlink:href", "assets/escalera.svg")
      .attr("width", sepw)
      .attr("height", seph)
      .attr("x", sepw*16)
      .attr("y", seph*0.5)
      .style("opacity", 0.4)
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
        .attr("stroke", $styling.gridcol)

      if (showNumbers) {
        g.append("text")
        .attr("x", x + (sepw/2))
        .attr("y", seph/2)
        .attr("text-anchor","middle")
        .text(i + 1)
        .attr("fill", $styling.gridcol)
      }
    }
    for (let i = 0; i < divsh; i++) {
      const y = i * seph;
      g.append("line")
        .attr("y1", y)
        .attr("y2", y)
        .attr("x1", 0)
        .attr("x2", w)
        .attr("stroke", $styling.gridcol)
        .attr("stroke-width", 0.5)
      
      if (showNumbers) {
        g.append("text")
        .attr("x", sepw/2)
        .attr("y", y + (seph/2))
        .attr("text-anchor","middle")
        .text(i + 1)
        .attr("fill", $styling.gridcol)
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
</script>

<div class="overlay-container" id="overlay-container" bind:this={overlayContainer}>
  {#if sketch} <P5 {sketch} /> {/if}
</div>

<style>
  .overlay-container {
    position: relative;
  }
</style>