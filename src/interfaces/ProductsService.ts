import { Product } from "./Prouduct";
import { ResponseStatus } from "./ResponseStatus";

export interface ProductsService {
  GET: (productId?: string, filters?: any) => Promise<ResponseStatus<Product | Product[]>>;
}