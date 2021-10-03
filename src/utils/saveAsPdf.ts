export const saveAsPdf = ( $anchor: HTMLAnchorElement, blob: Blob ) => {
  const urlPdf = URL.createObjectURL( blob );
  $anchor.href = urlPdf;
  $anchor.download = 'boleta_' + new Date().toLocaleString('es-CL').replace(/\D/g, '');
  $anchor.click();
}