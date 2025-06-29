import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import { useCategoryStore } from "@/store/category.store";
import toast, { Toaster } from "react-hot-toast";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addCategory, isLoading } = useCategoryStore();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding category...");
    } else {
      toast.dismiss();
    }
  }, [isLoading]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await addCategory(data);
      if (response) {
        toast.success("Category added successfully!");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category. Please try again.");
    }
  };

  return (
    <div className="font-serif">
      <Toaster />
      <h1 className="text-2xl text-blue-900 font-semibold mb-4">
        Add New Category
      </h1>
      <div className="flex flex-col justify-center font-serif gap-4 bg-white rounded-2xl p-6">
        <Button
          variant="outline"
          className="bg-gray-50 hover:bg-gray-200 w-fit"
          onClick={() => {
            window.history.back();
          }}
        >
          <FaArrowLeft className="size-4" />
          Back
        </Button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="categoryName" className="text-sm font-semibold">
              Category Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Category name is required",
              })}
              className={`border rounded-lg p-2 ${
                errors.categoryName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.categoryName && (
              <span className="text-red-500 text-sm">
                {errors.categoryName.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-semibold">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="border rounded-lg p-2 border-gray-300"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 w-1/4 cursor-pointer"
            >
              Add Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
