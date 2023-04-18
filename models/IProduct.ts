export interface IProduct {
    products?: (ProductsEntity)[] | null;
    total: number;
    skip: number;
    limit: number;
  }
  export interface ProductsEntity {
    products_id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images?: (string)[] | null;
  }
  