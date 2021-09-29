import { categoriesService } from './services/categoriesService';
import { productsService } from './services/productsService';

import { loadPage } from './utils/loadPage';

import { Product } from './interfaces/Prouduct';
import { Category } from './interfaces/Category';

import './style.css'

const app = document.querySelector<HTMLDivElement>('#app');
const _productsService = productsService;
const _categoriesService = categoriesService;
const PRODUCTS: Product[] = []
const CATEGORIES: Category[] = []

document.addEventListener('readystatechange', async (evt: Event) => {
  if (document.readyState === 'interactive') console.log('interactive');
  if (document.readyState === 'loading') console.log('loading');
  if (document.readyState === 'complete') {
    console.log('DOM complete')
    const $homePage = await loadPage('src/pages/Home.html', 'home');
    app?.appendChild($homePage);
  };
})

document.addEventListener('DOMContentLoaded', async () => {
  const [ productsResp, categoriesResp ] = await Promise.all([ _productsService.GET(), _categoriesService.GET() ]);
  if ( productsResp.statusCode === 200 && categoriesResp.statusCode === 200 ) {
    console.log(productsResp, categoriesResp)
  }
})

