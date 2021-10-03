import { Product } from "../interfaces/Prouduct";
import { Store } from "../interfaces/Store";

export const addProductToCart = ( store: Store, product: Product ) => {
  const shoppingCart = store.SHOPPING_CART;
  ( shoppingCart[product.id] === undefined )
    ? shoppingCart[product.id] = [product]
    : shoppingCart[product.id].push(product);
};