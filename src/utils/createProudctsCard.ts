import { Product } from "../interfaces/Prouduct";
import { ShowToast } from "../interfaces/ShowToast";
import { Store } from "../interfaces/Store";
import { addProductToCart } from "./addProductToCart";
import { showToast } from "./showToast";

export const createProudctsCard = ( store: Store ) => {
  const $fragment = document.createDocumentFragment();

  const handleClickAddProduct = ( $btnAddToCart: HTMLButtonElement, product: Product ) => {
    const toastConf: ShowToast = {
      duration: 3000,
      iconHexColor: '#20c997',
      message: `Producto <b>${product.name}</b> agregado al carrito.`,
      title: 'Carrito'
    };
    addProductToCart( store, product );
    showToast( toastConf );

    $btnAddToCart.disabled = true;
    setTimeout(() => $btnAddToCart.disabled = false, 500);
  };

  const handleError404Image = ( evt: any ) => {
    evt.target.src = 'https://googledino.ru/assets/googe_dino.png';
  };

  store.PRODUCTS.forEach( product => {
    const $divContainer = document.createElement('div');
    const $imgProd = document.createElement('img');
    const $divBody = document.createElement('div');
    const $hr = document.createElement('hr');
    const $h5Title = document.createElement('h5');
    const $pTotal = document.createElement('p');
    const $delPrice = document.createElement('del');
    const $btnAddToCart = document.createElement('button');
    const $spanIco = document.createElement('span');
    
    $divContainer.className = 'card shadow mb-4 rounded-3 p-2 animate__animated animate__fadeIn';
    $imgProd.className = 'card-img-top';
    $divBody.className = 'card-body';
    $h5Title.className = 'card-title';
    $pTotal.className = 'fs-2 fw-bolder';
    $delPrice.className = `fs-6 d-inline-block fst-italic text-muted ${(product.discount === 0) && 'opacity-0'}`
    $btnAddToCart.className = 'btn-custom btn-custom--outline-orange';
    $spanIco.className = 'material-icons-outlined';

    $divContainer.id = product.id.toString();
    $imgProd.src = product.url_image;
    $imgProd.alt = product.name;
    $imgProd.loading = 'lazy';
    $h5Title.textContent = product.name;
    $pTotal.textContent = '$' + (product.price - product.discount).toLocaleString('es-CL');
    $delPrice.textContent = '$' + product.price.toLocaleString('es-CL');
    $btnAddToCart.textContent = 'Agregar';
    $spanIco.textContent = 'add_shopping_cart';

    $btnAddToCart.onclick = () => handleClickAddProduct( $btnAddToCart, product );
    $imgProd.onerror = (evt: any) => handleError404Image( evt );
    
    $btnAddToCart.appendChild($spanIco);
    $divBody.appendChild($h5Title);
    $divBody.appendChild($delPrice);
    $divBody.appendChild($pTotal);
    $divBody.appendChild($btnAddToCart);
    $divContainer.appendChild($imgProd);
    $divContainer.appendChild($hr);
    $divContainer.appendChild($divBody);

    $fragment.appendChild($divContainer)
  });

  return $fragment;
};