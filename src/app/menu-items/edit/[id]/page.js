"use client";
import DeleteButton from "@/components/DeleteButton";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import Spinner from "@/components/layout/Spinner";
import UserTabs from "@/components/layout/UserTabs";
import {
  useDeleteMenuItem,
  useGetMenuItemById,
  useGetMenuItems,
  useGetUserInfo,
  useUpdateMenuItem,
} from "@/libs/Tanstack/queries";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {
  const { id } = useParams();

  const [redirectToItems, setRedirectToItems] = useState(false);
  const { data, isPending: loading } = useGetUserInfo();
  const { data: menuItem, isPending: menuItemLoading } = useGetMenuItemById(id);
  const { mutateAsync: updateMenuItem, isSuccess: updateMenuItemSuccess } =
    useUpdateMenuItem();
  const { mutateAsync: deleteMenuItem, isSuccess: deleteMenuItemSuccess } =
    useDeleteMenuItem();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (updateMenuItemSuccess === true || deleteMenuItemSuccess === true) {
      queryClient.invalidateQueries(["GET_MENU_ITEMS", "GET_MENU_ITEM_BY_ID"]);

      redirect("/menu-items");
    }
  }, [updateMenuItemSuccess, deleteMenuItemSuccess, queryClient]);
  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    toast.promise(updateMenuItem(data), {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }
  async function handleDeleteClick() {
    toast.promise(deleteMenuItem(id), {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  if (loading || menuItemLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data?.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className=" w-full mt-2 gap-4  md:grid md:grid-cols-[0.3fr_0.7fr]">
        <div></div>
        <div className="w-full ">
          <DeleteButton
            label="Delete this menu item"
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
}
