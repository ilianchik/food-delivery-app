"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useGetCategories, useGetMenuItems } from "@/libs/Tanstack/queries";
import { useEffect, useState } from "react";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import { useRef } from "react";
import { scroll } from "@/utils/helpers";
import Spinner from "@/components/layout/Spinner";
export default function MenuPage() {
  const { data: categories, isPending: categoriesLoading } = useGetCategories();
  const { data: menuItems, isPending: menuItemsLoading } = useGetMenuItems();
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    setActiveCategory(categories ? categories[0]._id : "");
  }, [categories]);

  const sliderRef = useRef();
  if (categoriesLoading || menuItemsLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <section className="max-w-6xl mx-auto">
      <div className="relative px-2 md:px-14 max-w-[90vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto ">
        <ChevronLeft
          onClick={() => scroll("left", sliderRef.current, 300)}
          className="md:w-8 md:h-8 w-7 h-7 absolute hidden sm:block sm:left-[-30px] md:left-0 top-[50%] translate-y-[-50%] text-primary cursor-pointer"
        />
        <div
          ref={sliderRef}
          className="mt-8 flex gap-3 overflow-scroll  mx-auto w-full  whitespace-nowrap  scroll-smooth  no-scrollbar z-20"
        >
          {categories?.length > 0 &&
            categories.map((category) => (
              <button
                onClick={() => setActiveCategory(category._id)}
                className={`text-primary text-sm px-3 md:px-6 md-text-base ${
                  activeCategory === category._id && "bg-primary text-white"
                }`}
                key={category._id}
              >
                {category.name}
              </button>
            ))}
        </div>
        <ChevronRight
          onClick={() => scroll("right", sliderRef.current, 300)}
          className="md:w-8 md:h-8 w-7 h-7  absolute hidden sm:block sm:right-[-30px] md:right-0 top-[50%] translate-y-[-50%] text-primary cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-11 ">
        {menuItems
          .filter((menuItem) => menuItem.category === activeCategory)
          .map((item) => (
            <MenuItem key={item._id} {...item} />
          ))}
      </div>
    </section>
  );
}
