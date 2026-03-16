import { Observable } from "./Observable";
import { Observer } from "./Observer";
import { Order, OrderStatus } from "./Types";

/**
 * Clase que gestiona pedidos
 */
export class OrderManager implements Observable {
  constructor(private orders: Order[] = [], private observers: Observer[] = []) {}

  /**
   * Busca un pedido en la lista de pedidos
   * @param id - Identificador del pedido
   * @returns - Undefined si no lo encuentra, Order si lo encuentra
   */
  getOrder(id: string): Order | undefined {
    const index: number = this.orders.findIndex(item => item.id === id);
    if (index === -1) {
      return undefined;
    } else {
      return this.orders.at(index);
    }
  }

  /**
   * Añade un pedido a la lista
   * @param order - Pedido a añadir a la lista
   */
  addOrder(order: Order): void {
    if (this.getOrder(order.id) !== undefined) {
      throw Error('El pedido con id ' + order.id + ' ya existe');
    } else {
      this.orders.push(order); 
    }
  }

  /**
   * Añade un observador a la lista
   * @param observer - Observador a suscribir
   */
  subscribe(observer: Observer): void {
    if (this.observers.includes(observer)) {
      throw new Error('The observer had already been subscribed');
    } else {
      this.observers.push(observer);
    } 
  }

  /**
   * 
   */
  unsubscribe(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index === -1) {
      throw new Error('The observer has not been subscribed');
    } else {
      this.observers.splice(index, 1);
    } 
  }

  notify(order: Order): void {
    this.observers.forEach((observer) => observer.update(order));
  }

  changeState(id: string, newState: OrderStatus): void | undefined {
    const index: number = this.orders.findIndex(item => item.id === id);
    if (index !== -1) {
      if (this.orders[index].status === newState) {
        return undefined;
      } else {
        this.orders[index].status = newState;
        this.notify(this.orders[index]);     
        return;
      }
    }
  }
}