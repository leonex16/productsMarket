import { Filters } from "../interfaces/Filters";

export const generateQueryStr = (filters: Filters) => {
  const orderBy: any = {
  '-1':['-1', null],
  1: ['name', 'ASC'],
  2: ['name', 'DESC'],
  3: ['price', 'ASC'],
  4: ['price', 'DESC'],
  5: ['discount', 'ASC'],
  6: ['discount', 'DESC'],
};

const [ sortBy, sortType ] = orderBy[filters.orderById!];
const newFilter = {...filters, sortBy, sortType };

if (newFilter.sortBy === '-1') delete newFilter.sortBy, delete newFilter.sortType;
if (newFilter.category === '-1') delete newFilter.category;
if (newFilter.name === '') delete newFilter.name;
delete newFilter.orderById;

const qsArr = Object.entries(newFilter).map((kv) => kv.join('='));

return '?' + qsArr.join('&');
};