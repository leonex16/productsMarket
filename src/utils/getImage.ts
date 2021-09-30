export const getImage = ( url: string | null ) => {
  return url !== null && url.length > 5 ? url : 'https://googledino.ru/assets/googe_dino.png';
}