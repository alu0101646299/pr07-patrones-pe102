export type OrderStatus = ("pending" | "confirmed" | "shipped"| "delivered");
export type Order = {id: string; status: OrderStatus; items: string};