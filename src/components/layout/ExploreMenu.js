"use client";

import { useGetCategories, useGetMenuItems } from "@/libs/Tanstack/queries";
import Image from "next/image";
import SectionHeaders from "./SectionHeaders";
import Spinner from "@/components/layout/Spinner";

function ExploreMenu() {
  const { data: categories, isPending: categoriesLoading } = useGetCategories();
  const { data: menuItems, isPending: menuItemsLoading } = useGetMenuItems();
  if (categoriesLoading || menuItemsLoading) {
    return <Spinner />;
  }

  return (
    <section className=" mb-5 md:mb-10">
      <SectionHeaders mainHeader={"Explore Our Menu"} />
      <p className="mb-6 text-sm md:text-base">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your <br />
        cravings and elevate your dining experience, one delicious meal at a
        time.
      </p>
      <div className="md:flex md:gap-6 md:justify-between mb-[50px]  md:flex-nowrap grid grid-cols-3 items-center">
        {categories.slice(0, 7)?.map((category) => {
          const filteredMenuItems = menuItems.filter(
            (menuItem) => menuItem.category === category._id
          );
          const randomIndex = Math.floor(
            Math.random() * filteredMenuItems.length
          );
          const randomMenuItem = filteredMenuItems[randomIndex];

          return (
            <div
              className=" flex flex-col text-center gap-1 justify-center items-center"
              key={category._id}
            >
              <Image
                className="rounded-full border w-[50%] md:w-auto"
                src={randomMenuItem?.image}
                alt="img"
                width={130}
                height={130}
              />
              <p className="md:text-lg text-gray-500">{category.name}</p>
            </div>
          );
        })}
      </div>
      <div className="w-full h-[1px] bg-gray-300"></div>
    </section>
  );
}

export default ExploreMenu;
