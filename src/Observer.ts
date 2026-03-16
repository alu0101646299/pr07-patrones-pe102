import { Order } from "./Types";

/**
 * Interfaz que define cómo debe comportarse un observador
 */
export interface Observer {
  update(order: Order): void; 
}