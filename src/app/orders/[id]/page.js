"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Spinner from "@/components/layout/Spinner";
import CartProduct from "@/components/menu/CartProduct";
import { useGetOrderById } from "@/libs/Tanstack/queries";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const { data: order, isPending: loadingOrder } = useGetOrderById(id);
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }
  if (loadingOrder)
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>

      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-fit">
                ${subtotal.toFixed(2)}
              </span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-fit">
                $5
              </span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-fit">
                ${(subtotal + 5).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="">
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
