import { ShowToast } from "../../interfaces/ShowToast";
import { Store } from "../../interfaces/Store";
import { buildResumeShoppingCart } from "../../utils/buildResumeShoppingCart";
import { showToast } from "../../utils/showToast";
import { toggleShoppingCartModal } from "../../utils/toggleShoppingCartModal";

const responsiveNavbar = () => {
  const $navbar = document.querySelector('#navbar-form-container')!;

  if ( window.innerWidth <= 768 ) {
    document.getElementById('navbar')?.insertAdjacentElement('afterend', $navbar);
  } else {
    document.getElementById('navbar-subcontent')?.insertAdjacentElement('beforeend', $navbar);
  }
};

const handleClickShoppingCart = ( store: Store, toastConf: ShowToast ) => {
  ( Object.values(store.SHOPPING_CART).length === 0 )
  ? showToast( toastConf )
  : toggleShoppingCartModal()
};

const initSelectCategory = ( store: Store, $select: HTMLInputElement ) => {
  const categories = store.CATEGORIES;
  const $fragment = document.createDocumentFragment();

  categories.forEach( category => {
    const $option = document.createElement('option');
    $option.value = category.id.toString();
    $option.textContent = category.name;
    $fragment.appendChild($option);
  });

  $select.append($fragment);
};

const filterProducts = ( store: Store, filterStr: string, categoryId: string, orderById: string ) => {
  const products = store.PRODUCTS;
  const categoryFilter = categoryId ?? "-1";
  const textFilter: string = filterStr?.toLowerCase() ?? '';
  const productsMatchIds: number[] = [];
  
  for ( let i = 0; i < products.length; i++ ) {
    const productName: string = products[i].name.toLowerCase();


    if (
      ( categoryFilter === '-1' && productName.includes(textFilter) ) ||
      (
        categoryFilter !== '-1' &&
        textFilter.length > 0 &&
        +categoryFilter === products[i].category &&
        productName.includes(textFilter)
      ) ||
      ( +categoryFilter === products[i].category && productName.includes(textFilter) )
    ) {
      productsMatchIds.push(products[i].id);
      continue;
    };
    
  };

  products.forEach( product => {
    const $product = document.getElementById(product.id.toString());

    productsMatchIds.includes(product.id)
      ? $product!.style.display = 'block'
      : $product!.style.display = 'none'; // TODO: CREATE CLASS
    
  });

};

const navbar = ( store: Store, $elem: Document ) => {
  setTimeout(() => responsiveNavbar())

  const $searcherProducts: HTMLInputElement = $elem.querySelector('#navbar-searcher')!;
  const $selectCategory: HTMLInputElement = $elem.querySelector('#navbar-categories')!;
  const $selectOrderBy: HTMLInputElement = $elem.querySelector('#navbar-order-by')!;
  const $buttonShoppingCart: HTMLElement = $elem.querySelector('#navbar-shopping-cart-ico')!;
  const toastConf: ShowToast = {
    duration: 3000,
    iconHexColor: '#ffc107',
    message: `Carrito vacío.`,
    title: 'Carrito'
  };

  initSelectCategory( store, $selectCategory );
  // TODO: FINISH NEW FILTER, NEED MODIFICATE FILTERPRODUCTS FUNCTION, IT MUST ALLOW 3 PARAMS
  window.onresize = responsiveNavbar;
  $searcherProducts.onkeyup = ( evt: any ) => filterProducts( store, $searcherProducts.value, $selectCategory.value, $selectOrderBy.value );
  $elem.onchange = ( evt: any ) => {
    if ( !evt.target.matches('#navbar-categories') && !evt.target.matches('#navbar-sort-by') ) return;
    console.log(evt.target.value)
    filterProducts( store, $searcherProducts.value, $selectCategory.value, $selectOrderBy.value )
  };
  $buttonShoppingCart.onmouseover = () => buildResumeShoppingCart( store );
  $buttonShoppingCart.onclick = () => handleClickShoppingCart( store, toastConf );
  
  return $elem;
};



export default navbar;