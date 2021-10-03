import { Product } from "./Prouduct";
import { ResponseStatus } from "./ResponseStatus";
import { ShoppingCart } from "./ShoppingCart";

export interface ProductsService {
  GET: (productId?: string, filters?: any) => Promise<ResponseStatus<Product | Product[]>>;
  DOWNLOAD_INVOICE: (shoppingCart: ShoppingCart) => Promise<Response>;
}