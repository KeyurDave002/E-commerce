export interface IOrder {
    order?: (OrderEntity)[] | null;
  }
  export interface OrderEntity {
    order_id: string;
    product_id: string;
    User_id: string;
    price: number;
    quantity: number;
    orderDate: string;
    deliverDdate: string;
    status: string;
    address1: Address1;
    tax: number;
  }
  export interface Address1 {
    street: string;
    address2: Address2;
  }
  export interface Address2 {
    city: string;
    state: string;
    pincode: string;
  }
  