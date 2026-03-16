import { Observer } from "./Observer"
import { Order } from "./Types"

/**
 * Clase InventoryUpdater que notifica de cambios en un observable
 */
export class InventoryUpdater implements Observer {
  /**
   * Notifica de cambios realizados en el observable
   * @param order - Order modificado
   */
  update(order: Order): void {
    console.log('Se ha actualizado el pedido con id ' + order.id) 
  }
}