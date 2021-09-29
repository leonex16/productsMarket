import { categoriesService } from './services/categoriesService';
import { productsService } from './services/productsService';

import { loadPage } from './utils/loadPage';

import { Product } from './interfaces/Prouduct';
import { Category } from './interfaces/Category';

import './style.css'

const app = document.querySelector<HTMLDivElement>('#app');
const _productsService = productsService;
const _categoriesService = categoriesService;
const PRODUCTS: Product[] = [];
const CATEGORIES: Category[] = [];
const STORE = { PRODUCTS, CATEGORIES };

const initdata = async () => {
  const [ categoriesResp, productsResp ] = await Promise.all([ _categoriesService.GET(), _productsService.GET() ]);

  if ( categoriesResp.body === null || productsResp.body === null ) { } // TODO: ALERT!

  STORE.CATEGORIES = [...categoriesResp.body as Category[] ];
  STORE.PRODUCTS = [...productsResp.body as Product[] ];
};

document.addEventListener('readystatechange', async () => {
  await initdata();

  if (document.readyState === 'interactive') console.log('interactive');
  if (document.readyState === 'loading') console.log('loading');

  if (document.readyState === 'complete') {
    console.log('DOM complete');
    const $homePage = await loadPage('src/pages/home/home.html', 'home'); // TODO: EXPORT ROUTE
    app?.appendChild($homePage);
  };
});

export { STORE };

