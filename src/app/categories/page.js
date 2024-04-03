"use client";
import DeleteButton from "@/components/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategories,
  useGetUserInfo,
  useUpdateCategory,
} from "@/libs/Tanstack/queries";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");

  const { data: profileData, isPending: profileLoading } = useGetUserInfo();
  const [editedCategory, setEditedCategory] = useState(null);
  const { data: categories } = useGetCategories();
  const { mutateAsync: createCategory } = useCreateCategory();
  const { mutateAsync: updateCategory } = useUpdateCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const data = { name: categoryName };
    if (!editedCategory) {
      toast.promise(createCategory(data), {
        loading: "Saving...",
        success: "Profile saved!",
        error: "Error",
      });
    }
    if (editedCategory) {
      data._id = editedCategory._id;
      toast.promise(updateCategory(data), {
        loading: "Saving...",
        success: "Profile saved!",
        error: "Error",
      });
    }
    setCategoryName("");
    setEditedCategory(null);
  }

  async function handleDeleteClick(_id) {
    toast.promise(deleteCategory(_id), {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update category" : "New category name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton
                  label="Delete"
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
