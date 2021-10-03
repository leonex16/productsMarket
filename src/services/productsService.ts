import { env } from "../environments/production";
import { handleResponse } from "../utils/handleResponse";
import { Product } from "../interfaces/Prouduct";
import { ResponseStatus } from "../interfaces/ResponseStatus";
import { ProductsService } from "../interfaces/ProductsService";
import { generateQueryStr } from "../utils/generateQueryStr";
import { ShoppingCart } from "../interfaces/ShoppingCart";

const { API_URL, API_VERSION, ENDPOINTS } = env;
const route = API_URL + API_VERSION + ENDPOINTS.PRODUCTS;
const _productsService: any = {};

_productsService.GET = (productId?: string, filters?: any): Promise<ResponseStatus<Product | Product[]>> => {
  switch (true) {
    case productId === undefined && filters === undefined:
      return handleResponse<Product[]>( fetch(route) );
    case productId === undefined:
      return handleResponse<Product[]>( fetch(route + generateQueryStr(filters)) );
    default:
      return handleResponse<Product>( fetch(route + '/' + productId) );
  };
};

_productsService.DOWNLOAD_INVOICE = ( shoppingCart: ShoppingCart ) => {
  const requestInit: RequestInit = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify( shoppingCart )
  };
  return fetch( route + '/generate-invoice', requestInit );
};

export const productsService: ProductsService = _productsService;
