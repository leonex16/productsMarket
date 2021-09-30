import { Product } from "./Prouduct";

export interface ShoppingCart {
  [key: number]: Product[]
}