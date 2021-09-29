import { LoadPage } from "../interfaces/LoadPage";
import { Store } from "../interfaces/Store";

export const loadPage = async (name: string, type: 'component' | 'page'): Promise<LoadPage> => {
  const path = type === 'component' ? '/src/components/' : '/src/pages/'
  const $article: HTMLElement = document.createElement('article');
  const module: Promise<any> = import(`${path}${name}/${name}.ts`);
  const page: Promise<Response> = fetch(`${path}${name}/${name}.html`);
  const [ moduleReps, pageResp ] = await Promise.allSettled([ module, page ]);
  const moduleDefaultFn: (store: Store, $elem: HTMLElement) => any = ( moduleReps as any )?.value?.default;
  const pageContentRaw: string = pageResp.status === 'fulfilled' ? await pageResp.value.text() : '';

  $article.setAttribute('id', name);
  $article.innerHTML = pageContentRaw;

  return { fn: moduleDefaultFn, $elem: $article};
};
