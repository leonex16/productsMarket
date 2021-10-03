import { Store } from "../../interfaces/Store";
import { createProudctsCard } from "../../utils/createProudctsCard";

const home = ( store: Store, $elem: Document ) => {
  const $productsFragment = createProudctsCard(store);
  $elem.appendChild($productsFragment);

  return $elem;
};

export default home;