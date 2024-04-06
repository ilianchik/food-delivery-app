"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useGetCategories, useGetMenuItems } from "@/libs/Tanstack/queries";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const { data: categories, isPending: categoriesLoading } = useGetCategories();
  const { data: menuItems, isPending: menuItemsLoading } = useGetMenuItems();
  if (categoriesLoading || menuItemsLoading) return "Loading...";
  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
