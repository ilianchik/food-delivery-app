"use client";

import { useGetCategories, useGetMenuItems } from "@/libs/Tanstack/queries";
import Image from "next/image";
import SectionHeaders from "./SectionHeaders";

function ExploreMenu() {
  const { data: categories, isPending: categoriesLoading } = useGetCategories();
  const { data: menuItems, isPending: menuItemsLoading } = useGetMenuItems();
  if (categoriesLoading || menuItemsLoading) return "";
  return (
    <section className="mb-10">
      <SectionHeaders mainHeader={"Explore Our Menu"} />
      <p className="mb-6">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your <br />
        cravings and elevate your dining experience, one delicious meal at a
        time.
      </p>
      <div className="flex gap-6 justify-between mb-[50px]">
        {categories.slice(-7)?.map((category) => {
          const filteredMenuItems = menuItems.filter(
            (menuItem) => menuItem.category === category._id
          );
          const randomIndex = Math.floor(
            Math.random() * filteredMenuItems.length
          );
          const randomMenuItem = filteredMenuItems[randomIndex];

          return (
            <div className="flex flex-col text-center gap-1" key={category._id}>
              <Image
                className="rounded-full border"
                src={randomMenuItem?.image}
                alt="img"
                width={130}
                height={130}
              />
              <p className="text-lg text-gray-500">{category.name}</p>
            </div>
          );
        })}
      </div>
      <div className="w-full h-[1px] bg-gray-300"></div>
    </section>
  );
}

export default ExploreMenu;
