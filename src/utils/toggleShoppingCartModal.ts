export const toggleShoppingCartModal = () => {
  const $modal = document.getElementById('modal-shopping-cart')!;
  const showModal = $modal.getAttribute('aria-hidden') === "true";

  if ( showModal ) {
    $modal.setAttribute('aria-hidden', 'false');
    document.body.setAttribute('style', 'overflow: hidden; padding-right: 17px;');
    document.body.insertAdjacentHTML('beforeend', '<div id="backdrop-custom" class="modal-backdrop fade show"></div>');
    document.body.classList.add('model-open');
    $modal.classList.remove('animate__animated');
    $modal.classList.remove('animate__zoomIn');
    $modal.classList.add('animate__animated');
    $modal.classList.add('animate__zoomIn');
    $modal.classList.add('show');
    $modal.style.display = 'block';
  } else {
    $modal.setAttribute('aria-hidden', 'true');
    document.body.setAttribute('style', '');
    document.body.querySelector('#backdrop-custom')!.remove();
    document.body.classList.remove('model-open');
    $modal.classList.remove('show');
    $modal.style.display = 'none';
  };
};