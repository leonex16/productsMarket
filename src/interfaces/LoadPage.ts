import { Store } from "./Store";

export interface LoadPage {
  $elem: HTMLElement;
  fn: (store: Store, $elem: HTMLElement) => Document;
};