"use client";

import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useGetUserInfo, useUpdateUserInfo } from "@/libs/Tanstack/queries";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const {
    data: userData,
    isPending: userDataLoading,
    isSuccess: userDataSuccess,
    isError: userDataError,
  } = useGetUserInfo();
  const { mutateAsync: updateUserInfo } = useUpdateUserInfo();
  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    toast.promise(updateUserInfo(data), {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  if (status === "loading" || userDataLoading) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }
  if (userDataError) {
    return "Error! Try again!";
  }

  if (userDataSuccess) {
    return (
      <section className="mt-8">
        <UserTabs isAdmin={userData.admin} />
        <div className="max-w-2xl mx-auto mt-8">
          <UserForm user={userData} onSave={handleProfileInfoUpdate} />
        </div>
      </section>
    );
  }
}
