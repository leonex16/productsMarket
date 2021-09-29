export const loadPage = async (pagePath: string, containerId: string): Promise<HTMLElement> => {
  const resp: Response = await fetch(pagePath);
  const pageContentRaw: string = await resp.text();
  const $article: HTMLElement = document.createElement('article');

  $article.setAttribute('id', containerId);
  $article.innerHTML = pageContentRaw;

  return $article;
};