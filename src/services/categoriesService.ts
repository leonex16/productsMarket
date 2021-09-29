import { env } from "../enviroments/develop";
import { handleResponse } from "../utils/handleResponse";
import { Category } from "../interfaces/Category";
import { CategoriesService } from "../interfaces/CategoriesService";
import { ResponseStatus } from "../interfaces/ResponseStatus";

const { API_URL, API_VERSION, ENDPOINTS } = env;
const route = API_URL + API_VERSION + ENDPOINTS.CATEGORIES;
export const _categoriesService: any = {};

_categoriesService.GET = async (): Promise<ResponseStatus<Category[]>> => handleResponse<Category[]>(fetch(route));

export const categoriesService: CategoriesService = _categoriesService;