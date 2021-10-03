import { categoriesService } from './services/categoriesService';
import { productsService } from './services/productsService';

import { loadPage } from './utils/loadPage';

import { Category } from './interfaces/Category';
import { LoadPage } from './interfaces/LoadPage';
import { Product } from './interfaces/Prouduct';
import { ShoppingCart } from './interfaces/ShoppingCart';
import { Store } from './interfaces/Store';

import './style.css'
import { isLoading } from './utils/isLoading';
import { ShowToast } from './interfaces/ShowToast';
import { showToast } from './utils/showToast';

const app = document.querySelector<HTMLDivElement>('#app');
const _productsService = productsService;
const _categoriesService = categoriesService;
const PRODUCTS: Product[] = [];
const CATEGORIES: Category[] = [];
const SHOPPING_CART: ShoppingCart = {};
const STORE: Store = { CATEGORIES, PRODUCTS, SHOPPING_CART };

const initdata = async () => {
  const toastConf: ShowToast = {
    duration: 6000,
    iconHexColor: '#dc3545',
    message: `Ops! Ha ocurrido un error crítico 😱😱😱.\nVuelva a intentarlo en unos minutos 👁️👄👁️.`,
    title: 'Administración'
  };

  const [ categoriesResp, productsResp ] = await Promise.all([ _categoriesService.GET(), _productsService.GET() ]);

  if ( categoriesResp.body === null || productsResp.body === null ) showToast( toastConf );

  STORE.CATEGORIES = [...categoriesResp.body as Category[] ];
  STORE.PRODUCTS = [...productsResp.body as Product[] ];
};

document.addEventListener('readystatechange', async () => {
  isLoading( true );
  await initdata();

  if (document.readyState === 'interactive') console.log('interactive');
  if (document.readyState === 'loading') console.log('loading');

  if (document.readyState === 'complete') {
    console.log('DOM complete');
    const navbarComp: LoadPage = await loadPage('navbar', 'component');
    const homePage: LoadPage = await loadPage('home', 'page');
    
    app?.appendChild(navbarComp.fn(STORE, navbarComp.$elem));
    app?.appendChild(homePage.fn(STORE, homePage.$elem));
    isLoading( false );
  };
});