export interface ICart {
    carts?: (CartsEntity)[] | null;
    total: number;
    skip: number;
    limit: number;
  }
  export interface CartsEntity {
    id: number;
    products?: (ProductsEntity)[] | null;
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
  }
  export interface ProductsEntity {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
  }
  