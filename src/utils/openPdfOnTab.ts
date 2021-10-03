export const openPdfOnTab = ( blob: Blob ) => {
  const urlPdf = URL.createObjectURL( blob );
  window.open(urlPdf);
};