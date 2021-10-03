type sortBy = 'name' | 'price' | 'discount' | 'category';
type sortType = 'ASC' | 'DESC';

export interface Filters {
  [key: string]: any;
  name?: string;
  category?: string;
  orderById?: string;
  sortBy?: sortBy;
  sortType?: sortType;
}