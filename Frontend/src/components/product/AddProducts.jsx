import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useSupplierStore } from "@/store/suppliers.store";
import { useCategoryStore } from "@/store/category.store";
import { useProductStore } from "@/store/product.store";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AddProducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { suppliers, fetchSuppliers } = useSupplierStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { addProduct, isLoading } = useProductStore();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding product...");
    } else {
      toast.dismiss();
    }
  }, [isLoading]);

  const onSubmit = async (data) => {
    // console.log("Form Data Submitted: ", data);
    try {
      const response = await addProduct(data, image);
      if (response) {
        toast.success("Product added successfully!");
      } 
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.detail || "Failed to add product");
    }
  };
  return (
    <div className="space-y-6">
      <Toaster />
      <Button
        variant={"outline"}
        onClick={() => {
          window.history.back();
        }}
      >
        <FaArrowLeft className="size-4" />
        Back
      </Button>
      <div className="flex flex-col justify-center font-serif gap-4 bg-white rounded-2xl p-10">
        <div className="flex items-center justify-center text-blue-900">
          <h1 className="font-semibold text-2xl">Add Product</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Product name is required" })}
                className={`border p-2 rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="barcode" className="font-semibold">
                Barcode
              </label>
              <input
                type="text"
                id="barcode"
                {...register("barcode", { required: "Barcode is required" })}
                className={`border p-2 rounded ${
                  errors.barcode ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter product barcode"
              />
              {errors.barcode && (
                <p className="text-red-500 text-xs">{errors.barcode.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="sellingPrice" className="font-semibold">
                Selling Price
              </label>
              <input
                type="number"
                id="sellingPrice"
                {...register("price", {
                  required: "Selling price is required",
                })}
                className={`border p-2 rounded ${
                  errors.sellingPrice ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter selling price"
              />
              {errors.sellingPrice && (
                <p className="text-red-500 text-xs">
                  {errors.sellingPrice.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="costPrice" className="font-semibold">
                Cost Price
              </label>
              <input
                type="number"
                id="costPrice"
                {...register("cost_price", {
                  required: "Cost price is required",
                })}
                className={`border p-2 rounded ${
                  errors.costPrice ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter cost price"
              />
              {errors.costPrice && (
                <p className="text-red-500 text-xs">
                  {errors.costPrice.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="font-semibold">
                Status
              </label>
              <select
                id="status"
                {...register("status", { required: "Status is required" })}
                className={`border p-2 rounded ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs">{errors.status.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="font-semibold">
                Category
              </label>
              <select
                id="category"
                {...register("category_id", {
                  required: "Category is required",
                })}
                className={`border p-2 rounded ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="supplier" className="font-semibold">
                Supplier
              </label>
              <select
                id="supplier"
                {...register("supplier_id", {
                  required: "Supplier is required",
                })}
                className={`border p-2 rounded ${
                  errors.supplier ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option
                    key={supplier.supplier_id}
                    value={supplier.supplier_id}
                  >
                    {supplier.name}
                  </option>
                ))}
              </select>
              {errors.supplier && (
                <p className="text-red-500 text-xs">
                  {errors.supplier.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="image" className="font-semibold">
                Product Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="border p-2 rounded"
              />
            </div>

            <Button
              variant={"default"}
              type="submit"
              className="bg-blue-500 text-white mt-6 hover:bg-blue-600 cursor-pointer"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
