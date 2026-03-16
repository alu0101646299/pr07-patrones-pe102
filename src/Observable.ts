import { Observer } from "./Observer";
import { Order } from "./Types";

export interface Observable {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(order: Order): void;
}