"use client";

import Spinner from "@/components/layout/Spinner";
import UserTabs from "@/components/layout/UserTabs";
import { dbTimeForHuman } from "@/libs/datetime";
import { useGetOrders, useGetUserInfo } from "@/libs/Tanstack/queries";
import Link from "next/link";

export default function OrdersPage() {
  const { data: profile, isPending: loading } = useGetUserInfo();
  const { data: orders, isPending: loadingOrders } = useGetOrders();
  const reversedOrders = orders ? [...orders].reverse() : [];

  if (loading || loadingOrders)
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {orders?.length > 0 &&
          reversedOrders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
            >
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-400") +
                      " p-2 rounded-md text-white w-24 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not paid"}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">{order.userEmail}</div>
                    <div className="text-gray-500 text-sm">
                      {dbTimeForHuman(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {order.cartProducts.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>
              <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                <Link href={"/orders/" + order._id} className="button">
                  Show order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
