"use client";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetUserInfo, useCreateMenuItem } from "@/libs/Tanstack/queries";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/layout/Spinner";

export default function NewMenuItemPage() {
  const { data, isPending: loading } = useGetUserInfo();
  const { mutateAsync: createMenuItem, isSuccess: createMenuItemSuccess } =
    useCreateMenuItem();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (createMenuItemSuccess === true) {
      redirect("/menu-items");
    }
  }, [createMenuItemSuccess, queryClient]);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    toast.promise(createMenuItem(data), {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
