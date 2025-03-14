"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartButton = () => {
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, [cart]);
  return (
    <>
      {cart.length == 0 ? (
        <></>
      ) : (
        <Link href={"/cart"} className="fixed bottom-10 right-10">
          <div className="relative rounded-full bg-red-700 p-3 sticky">
            <div className="absolute -top-0 -left-1 rounded-full w-5 h-5 flex justify-center items-center bg-red-500">
              <p className="text-xs font-medium">{cartCount}</p>
            </div>
            <svg
              className="w-6 h-6 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" />
            </svg>
          </div>
        </Link>
      )}
    </>
  );
};

export default CartButton;
