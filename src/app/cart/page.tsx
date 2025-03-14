"use client";

import { CartItem, DiscountCampaign } from "@/type";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { formatPrice } from "@/lib/utils";

export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [discountCampaigns] = useState<DiscountCampaign[]>([
    {
      type: "Coupon",
      discountType: "Percentage",
      amount: 50,
      percentage: 10,
    },
    {
      type: "On Top",
      discountType: "Point",
      category: "clothing",
      amount: 15,
      points: 68,
    },
    {
      type: "Seasonal",
      everyX: 300,
      discountY: 40,
    },
  ]);

  const clearCart = () => {
    localStorage.removeItem("cart");
    redirect("/");
  };

  const calculateDiscount = async () => {
    try {
      const response = await fetch("/api/discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          discountCampaigns,
        }),
      });

      const data = await response.json();
      setFinalPrice(data.finalPrice);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cart.length !== 0) {
      calculateDiscount();
    }
  }, [cart]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    } else {
      redirect("/");
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-5">
        <div className="border-b border-zinc-700 pb-2">
          <h1 className="font-bold text-xl">ตะกร้าสินค้า</h1>
        </div>
        <div className="py-5">
          <div className="border rounded border-zinc-700 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase border-b border-zinc-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {cart.map((item) => (
                  <tr key={item.id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-50">
          <p>ราคาทั้งหมด {finalPrice} บาท</p>
          <button
            className="w-full bg-red-600 rounded p-1 hover:bg-red-800 cursor-pointer"
            onClick={clearCart}
          >
            จ่ายเงิน
          </button>
        </div>
      </div>
    </div>
  );
}
