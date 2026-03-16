import { Observable } from "./Observable";
import { Observer } from "./Observer";
import { Order, OrderStatus } from "./Types";

export class OrderManager implements Observable {
  constructor(private orders: Order[] = [], private observers: Observer[] = []) {}

  getOrder(id: string): Order | undefined {
    const index: number = this.orders.findIndex(item => item.id === id);
    if (index === -1) {
      return undefined;
    } else {
      return this.orders.at(index);
    }
  }

  addOrder(order: Order): void {
    if (this.getOrder(order.id) !== undefined) {
      throw Error('El pedido con id ' + order.id + ' ya existe');
    } else {
      this.orders.push(order); 
    }
  }

  subscribe(observer: Observer): void {
    if (this.observers.includes(observer)) {
      throw new Error('The observer had already been subscribed');
    } else {
      this.observers.push(observer);
    } 
  }

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