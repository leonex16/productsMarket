import { Category } from "./Category";
import { Product } from "./Prouduct";
import { ShoppingCart } from "./ShoppingCart";

export interface Store {
  CATEGORIES: Category[];
  PRODUCTS: Product[];
  SHOPPING_CART: ShoppingCart;
};