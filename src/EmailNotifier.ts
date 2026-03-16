import { Observer } from "./Observer"
import { Order } from "./Types"

/**
 * Clase EmailNotifier que notifica de cambios en un observable
 */
export class EmailNotifier implements Observer {
  /**
   * Notifica de cambios realizados en el observable
   * @param order - Order modificado
   */
  update(order: Order): void {
    console.log('El estado del pedido con id ' + order.id + ' ha sido actualizado a ' + order.status) 
  }
}