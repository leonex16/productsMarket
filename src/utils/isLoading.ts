export const isLoading = ( showSpinner: boolean ) => {
  const $spinnerBackdrop = document.getElementById('spinner')!;

  if ( showSpinner === true ) {
    $spinnerBackdrop.classList.remove('d-none');
    $spinnerBackdrop.classList.add('d-flex');
  } else {
    $spinnerBackdrop.classList.remove('d-flex');
    $spinnerBackdrop.classList.add('d-none');
  };

};