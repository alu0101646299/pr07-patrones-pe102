import { Observer } from "./Observer"
import { Order } from "./Types"

export class InventoryUpdater implements Observer {
  update(order: Order): void {
    console.log('Se ha actualizado el pedido con id ' + order.id) 
  }
}