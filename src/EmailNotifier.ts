import { Observer } from "./Observer"
import { Order } from "./Types"

export class EmailNotifier implements Observer {
  update(order: Order): void {
    console.log('El estado del pedido con id ' + order.id + ' ha sido actualizado a ' + order.status) 
  }
}