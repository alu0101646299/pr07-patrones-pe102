import { Order } from "./Types";

export interface Observer {
  update(order: Order): void; 
}