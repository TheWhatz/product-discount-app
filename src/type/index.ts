export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface DiscountCampaign {
  type: "Coupon" | "On Top" | "Seasonal";
  discountType?: "Fixed" | "Percentage" | "Point";
  amount?: number;
  percentage?: number;
  category?: string;
  points?: number;
  everyX?: number;
  discountY?: number;
}
