import { Store } from "../../interfaces/Store";

const initSelectCategory = ( store:Store, $select: HTMLInputElement ) => {
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

const filterProducts = ( store: Store, filterStr?: string, categoryId?: string ) => {
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
  const $selectCategory: HTMLInputElement = $elem.querySelector('#navbar-categories')!;
  const $searcherProducts: HTMLInputElement = $elem.querySelector('#navbar-searcher')!;

  initSelectCategory( store, $selectCategory );
  $searcherProducts.onkeyup = ( evt: any ) => filterProducts( store, evt.target.value, $selectCategory.value );
  $selectCategory.onchange = ( evt: any ) => filterProducts( store, $searcherProducts.value, evt.target.value );
  
  return $elem;
};

export default navbar;