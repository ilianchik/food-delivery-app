"use client";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import {
  useGetUserInfo,
  useGetUserInfoById,
  useUpdateUserInfoById,
} from "@/libs/Tanstack/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { data, isPending: loading } = useGetUserInfo();

  const { id } = useParams();
  const { data: user, isPending: userLoading } = useGetUserInfoById(id);
  const {
    mutateAsync: updateUserInfoById,
    isSuccess: updateUserInfoByIdSuccess,
  } = useUpdateUserInfoById();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (updateUserInfoByIdSuccess === true) {
      queryClient.invalidateQueries([
        "GET_USER_INFO",
        "GET_USER_INFO_BY_ID",
        "GET_USERS",
      ]);
    }
  }, [updateUserInfoByIdSuccess, queryClient]);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();

    toast.promise(updateUserInfoById({ data, id }), {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  if (loading || userLoading) {
    return "Loading user profile...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
