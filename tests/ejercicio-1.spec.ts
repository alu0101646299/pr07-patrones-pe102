import { describe, test, expect, vi, beforeEach } from 'vitest';
import { OrderManager } from '../src/OrderManager'
import { EmailNotifier } from '../src/EmailNotifier'
//import { InventoryUpdater } from '../src/InventoryUpdater'
import { Order, OrderStatus } from '../src/Types'

describe('OrderManager, EmailNotifier, InventoryUpdater', () => {
  let myOrderManager = new OrderManager();
  const myEmailNotifier = new EmailNotifier();
  //const myInventoryUpdater = new InventoryUpdater();

  const myOrder: Order = {id: "1234", status: "pending", items: "item1, item2"};
  const myOrder2: Order = {id: "12345", status: "confirmed", items: "item1, item2"};
  const myNewState: OrderStatus = "confirmed";

  beforeEach(() => {
    myOrderManager = new OrderManager();
    vi.restoreAllMocks();
  });

  test('getOrder', () => {
    myOrderManager.addOrder(myOrder);
    expect(myOrderManager.getOrder(myOrder.id)).toStrictEqual(myOrder);
  });

  test('getOrder undefined', () => {
    expect(myOrderManager.getOrder(myOrder.id)).toBe(undefined);
  });

  test('addOrder', () => {
    myOrderManager.addOrder(myOrder);
    expect(myOrderManager.getOrder(myOrder.id)).toStrictEqual(myOrder);
  });

  test('addOrder Error', () => {
    myOrderManager.addOrder(myOrder);
    expect(() => myOrderManager.addOrder(myOrder)).toThrowError("El pedido con id 1234 ya existe");
  });

  test('subscribe', () => {
    expect(myOrderManager.subscribe(myEmailNotifier));
  });

  test('subscribe Error', () => {
    myOrderManager.subscribe(myEmailNotifier);
    expect(() => myOrderManager.subscribe(myEmailNotifier)).toThrowError("The observer had already been subscribed");
  });

  test('unsubscribe', () => {
    myOrderManager.subscribe(myEmailNotifier);
    expect(myOrderManager.unsubscribe(myEmailNotifier));
  });

  test('unsubscribe Error', () => {
    expect(() => myOrderManager.unsubscribe(myEmailNotifier)).toThrowError("The observer has not been subscribed");
  });

  test('changeState', () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    myOrderManager.addOrder(myOrder);
    expect(myOrderManager.changeState(myOrder.id, myNewState));
  });

  test('changeState undefined', () => {
    myOrderManager.addOrder(myOrder2);
    expect(myOrderManager.changeState(myOrder2.id, myNewState)).toBe(undefined);
  });

  /**test('EmailNotifier.update', () =\> \{
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() =\> \{\});
    myOrderManager.addOrder(myOrder);
    myOrderManager.subscribe(myEmailNotifier);
    myOrderManager.changeState(myOrder.id, myNewState);
    expect(consoleSpy).toHaveBeenCalledWith("El estado del pedido con id 1234 ha sido actualizado a confirmed");
  \});*/

  /**test('InventoryUpdater.update', () =\> \{
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() =\> \{\});
    myOrderManager.addOrder(myOrder);
    myOrderManager.subscribe(myInventoryUpdater);
    myOrderManager.changeState(myOrder.id, myNewState);
    expect(consoleSpy).toHaveBeenCalledWith("Se ha actualizado el pedido con id 1234");
  \});*/
});