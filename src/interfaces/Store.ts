import { Category } from "./Category";
import { Product } from "./Prouduct";

export interface Store {
  CATEGORIES: Category[];
  PRODUCTS: Product[];
};