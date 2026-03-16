import { Observer } from "./Observer";
import { Order } from "./Types";

/**
 * Interfaz que define cómo debería de comportarse un observable
 */
export interface Observable {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(order: Order): void;
}