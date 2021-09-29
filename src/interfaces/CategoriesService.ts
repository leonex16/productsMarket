import { Category } from "./Category";
import { ResponseStatus } from "./ResponseStatus";

export interface CategoriesService {
  GET: () => Promise<ResponseStatus<Category[]>>;
}