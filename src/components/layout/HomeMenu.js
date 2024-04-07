"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useGetBestSellers } from "@/libs/Tanstack/queries";
import Link from "next/link";
import Right from "@/components/icons/Right";
import Spinner from "@/components/layout/Spinner";

export default function HomeMenu() {
  const { data: bestSellers, isPending: bestSellersLoading } =
    useGetBestSellers();
  if (bestSellersLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <div className="mb-4">
        <SectionHeaders
          subHeader={"check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-5">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
      <div className="flex justify-center mt-10 font-semibold text-primary md:text-xl mb-[50px]">
        <Link
          className="border border-primary rounded-full px-6 py-2 flex items-center"
          href={"/menu"}
        >
          Discover more{" "}
          <span className="ml-2">
            {" "}
            <Right />
          </span>
        </Link>
      </div>
      <div className="w-full h-[1px] bg-gray-300"></div>
    </section>
  );
}
