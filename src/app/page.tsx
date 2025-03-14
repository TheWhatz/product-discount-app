import CartButton from "@/components/CartButton";
import ProductList from "@/components/ProductList";
import { CartProvider } from "@/contexts/CartContext";

export default function Home() {
  return (
    <div className="min-h-screen">
      <CartProvider>
        <div className="container mx-auto p-5">
          <div className="border-b border-zinc-700 pb-2">
            <h1 className="font-bold text-xl">รายการสินค้าทั้งหมด</h1>
          </div>
          <div className="py-5">
            <ProductList />
          </div>
        </div>
        <CartButton />
      </CartProvider>
    </div>
  );
}
