import { env } from "../environments/production";
import { handleResponse } from "../utils/handleResponse";
import { Product } from "../interfaces/Prouduct";
import { ResponseStatus } from "../interfaces/ResponseStatus";
import { ProductsService } from "../interfaces/ProductsService";

const { API_URL, API_VERSION, ENDPOINTS } = env;
const route = API_URL + API_VERSION + ENDPOINTS.PRODUCTS;
const _productsService: any = {};
console.log(route)

const qs = (filters: any) => {
  const qsArr = Object.entries(filters).map((kv) => kv.join('='));

  return '?' + qsArr.join('&');
}

_productsService.GET = async (productId?: string, filters?: any): Promise<ResponseStatus<Product | Product[]>> => {
  switch (true) {
    case productId === undefined && filters === undefined:
      return handleResponse<Product[]>(fetch(route));
    case productId === undefined:
      return handleResponse<Product[]>(fetch(route + qs(filters)));
    default:
      return handleResponse<Product>(fetch(route + '/' + productId));
  };
};

export const productsService: ProductsService = _productsService;
