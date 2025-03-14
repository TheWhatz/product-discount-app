"use client";

import { Cart } from "@/type";
import { useEffect, useState } from "react";
import products from "@/data/product.json";
import { redirect } from "next/navigation";

export default function Checkout() {
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      try {
        setCart(JSON.parse(cart));
      } catch (ex) {
        localStorage.removeItem("cart");
        redirect("/");
      }
    } else {
      redirect("/");
    }
  }, []);
  return (
    <ul>
      {cart.map((item) => (
        <li key={item.productId}>
          {products.map((product) => (
            <>
              {item.productId === product.id ? (
                <div key={product.id}>
                  <p>{product.name}</p>
                  <p>{product.category}</p>
                  <p>{item.quantity}</p>
                  <p>{product.price}</p>
                  <p>{product.price * item.quantity}</p>
                </div>
              ) : (
                <></>
              )}
            </>
          ))}
        </li>
      ))}
    </ul>
  );
}
