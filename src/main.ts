import { categoriesService } from './services/categoriesService';
import { productsService } from './services/productsService';

import { loadPage } from './utils/loadPage';

import { Category } from './interfaces/Category';
import { LoadPage } from './interfaces/LoadPage';
import { Product } from './interfaces/Prouduct';
import { ShoppingCart } from './interfaces/ShoppingCart';
import { Store } from './interfaces/Store';

import './style.css'

const app = document.querySelector<HTMLDivElement>('#app');
const _productsService = productsService;
const _categoriesService = categoriesService;
const PRODUCTS: Product[] = [];
const CATEGORIES: Category[] = [];
const SHOPPING_CART: ShoppingCart = {};
const STORE: Store = { CATEGORIES, PRODUCTS, SHOPPING_CART };

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
    const navbarComp: LoadPage = await loadPage('navbar', 'component'); // TODO: EXPORT ROUTE
    const homePage: LoadPage = await loadPage('home', 'page'); // TODO: EXPORT ROUTE

    
    app?.appendChild(navbarComp.fn(STORE, navbarComp.$elem));
    app?.appendChild(homePage.fn(STORE, homePage.$elem));    
  };
});
