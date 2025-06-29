import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useSupplierStore } from "@/store/suppliers.store";
import toast, { Toaster } from "react-hot-toast";

const AddSupplier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addSupplier, isLoading } = useSupplierStore();

  const onSubmit = async (data) => {
    try {
      const res = await addSupplier(data);
      if (res) {
        toast.success("Supplier added successfully");
      }
    } catch (error) {
      console.error("Error adding supplier:", error);
      toast.error("Failed to add supplier. Please try again.");
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding supplier...");
    } else {
      toast.dismiss();
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col justify-center font-serif gap-2 bg-white rounded-2xl p-10">
      <Toaster />
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="bg-gray-50 hover:bg-gray-200"
          onClick={() => {
            window.history.back();
          }}
        >
          <FaArrowLeft className="size-4" />
          Back
        </Button>
      </div>
      <div className="flex justify-center items-center flex-col gap-4">
        <h1 className="font-semibold text-2xl text-blue-500">
          Add New Supplier
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6 font-serif w-full"
        >
          <div>
            <label className="font-semibold text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter supplier Company Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="font-semibold text-gray-700">Contact Phone</label>
            <input
              type="text"
              {...register("contact_phone", {
                required: "Contact phone is required",
              })}
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.contact_phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter supplier contact phone"
            />
            {errors.contact_phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contact_phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`mt-1 block w-full p-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter supplier email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-semibold text-gray-700">Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              className={`mt-1 block w-full p-2 border rounded-md `}
              placeholder="Enter supplier address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-semibold text-gray-700">Status</label>
            <select
              {...register("status", { required: "Status is required" })}
              className={`mt-1 block w-full p-2 border rounded-md`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 mt-7 cursor-pointer"
          >
            Add Supplier
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddSupplier;
