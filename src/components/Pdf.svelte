<script>
  import { jsPDF } from 'jspdf'
  import { units } from '../stores/drawHelpers';

  const { w , h} = $units;

  export let canvasElements;
  export let svgElements;

  const doc = new jsPDF("p", "px", [w, h]);

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

  async function addPages() {
    for (let i = 0; i < svgElements.length; i++) {
      if (i !== 0) {
        doc.addPage();
      }
      await doc.svg(svgElements[i], { x: 0, y: 0, width: w, height: h});
      doc.addImage(canvasElements[i], 'PNG', 0, 0, w, h, "canvas");
    }
    
  }

  async function exportPdf() {
    await addPages();
    doc.save('sistematizacion.pdf');
  }
</script>

<button on:click={exportPdf}>EXPORTAR</button>