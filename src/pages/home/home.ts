import { Product } from "../../interfaces/Prouduct";
import { Store } from "../../interfaces/Store";

const createProudctsCard = (products: Product[]) => {
  const $fragment = document.createDocumentFragment();
  products.forEach( product => {
    const $divContainer = document.createElement('div');
    const $imgProd = document.createElement('img');
    const $divBody = document.createElement('div');
    const $h5Title = document.createElement('h5');
    const $btnAddToCart = document.createElement('button');
    const $spanIco = document.createElement('span');
    
    $divContainer.className = 'card';
    $imgProd.className = 'card-img-top';
    $divBody.className = 'card-body';
    $h5Title.className = 'card-title';
    $btnAddToCart.className = '';
    $spanIco.className = 'material-icons-outlined';

    $divContainer.id = product.id.toString();
    $imgProd.src = product.url_image ?? '';
    $imgProd.alt = product.name;
    $h5Title.textContent = product.name;
    $spanIco.textContent = 'add_shopping_cart';

    $btnAddToCart.appendChild($spanIco);
    $divBody.appendChild($h5Title);
    $divBody.appendChild($btnAddToCart);
    $divContainer.appendChild($imgProd);
    $divContainer.appendChild($divBody);

    $fragment.appendChild($divContainer)
  });

  return $fragment;
};

const home = ( store: Store, $elem: Document ) => {
  const $productsFragment = createProudctsCard(store.PRODUCTS);
  $elem.appendChild($productsFragment);

  return $elem;
};

export default home;