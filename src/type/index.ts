export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface Cart {
  productId: number;
  quantity: number;
}
