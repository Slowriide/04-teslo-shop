"use client";

import Image from "next/image";

import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import { useEffect, useState } from "react";
import Link from "next/link";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const productsQuantity = useCartStore((state) => state.getTotalItems());
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const deleteProduct = useCartStore((state) => state.deleteCartProduct);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug} - ${product.size}`} className="flex  mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded"
            style={{
              width: "100px",
              height: "100px",
            }}
          />

          <div>
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              <p>
                {product.size} - {product.title}
              </p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onValueChanged={(value) => updateProductQuantity(product, value)}
            />
            <button
              className="underline mt-3 cursor-pointer"
              onClick={() => deleteProduct(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
