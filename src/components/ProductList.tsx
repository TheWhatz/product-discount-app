"use client";

import React from "react";
import products from "@/data/product.json";
import { formatPrice } from "@/lib/utils";
import { CartItem, Product } from "@/type";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductList = () => {
  const { setCart } = useCart();
  const router = useRouter();

  const handlePurchase = (item: Product) => {
    setCart([
      {
        id: item.id,
        category: item.category,
        name: item.name,
        price: item.price,
        quantity: 1,
      },
    ]);
    router.push("/cart");
  };

  const handleAddCart = (item: Product, quantity: number) => {
    setCart((prevCart) => {
      const existProduct = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existProduct) {
        return prevCart
          .map((cartItem): CartItem => {
            if (cartItem.quantity < item.stock) {
              return { ...cartItem, quantity: cartItem.quantity + quantity };
            } else {
              return cartItem;
            }
          })
          .filter(Boolean);
      }

      if (quantity <= item.stock) {
        return [
          ...prevCart,
          {
            id: item.id,
            category: item.category,
            name: item.name,
            price: item.price,
            quantity: quantity,
          },
        ];
      }

      return [...prevCart];
    });
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((product) => (
        <li className="border border-zinc-700 rounded p-5" key={product.id}>
          <div className="flex justify-center">
            <Image
              src={product.image}
              alt="product-image"
              className="object-cover h-75 w-75 rounded"
            />
          </div>
          <div className="py-3 flex flex-col items-center">
            <p className="text-lg text-center">{product.name}</p>
            <p className="text-sm">ราคา {formatPrice(product.price)} บาท</p>
          </div>
          <div className="flex gap-3">
            {product.stock == 0 ? (
              <button disabled className="w-full bg-red-950 rounded p-1 ">
                สินค้าหมด
              </button>
            ) : (
              <>
                <button
                  className="w-full bg-red-600 rounded p-1 hover:bg-red-800 cursor-pointer"
                  onClick={() => {
                    handlePurchase(product);
                  }}
                >
                  ซื้อ
                </button>
                <button
                  className="w-full bg-zinc-700 rounded p-1 hover:bg-zinc-800 cursor-pointer"
                  onClick={() => {
                    handleAddCart(product, 1);
                  }}
                >
                  ใส่ตะกร้า
                </button>
              </>
            )}
          </div>
          <p className="text-center text-xs pt-2 text-zinc-400">
            คงเหลือ {product.stock} ชิ้น
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
