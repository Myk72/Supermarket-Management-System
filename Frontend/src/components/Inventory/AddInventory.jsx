import React, { useEffect, useState } from "react";
import { CustomTable } from "../table/Table";
import SelectProductColumns from "../columns/SelectProduct";
import { useProductStore } from "@/store/product.store";
import { useForm } from "react-hook-form";

const AddInventory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { products, fetchProducts } = useProductStore();
  const [selectedProducts, setSelectedProducts] = useState([]);
  //   console.log(selectedProducts, "selected products");
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onSubmit = (data) => {};
  return (
    <div className="space-y-6 font-serif">
      <h1 className="text-2xl font-semibold text-blue-900 mb-4">
        Add Inventory
      </h1>
      <div className="grid grid-cols-2 gap-6 bg-white p-4 rounded-2xl border">
        <CustomTable
          data={products}
          columns={SelectProductColumns}
          onRowClick={(row) => {
            setSelectedProducts(row);
          }}
        />
        <form className="border-l border-gray-300 p-4">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product ID
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedProducts.product_id || ""}
              readOnly
              placeholder="Select a product from the left"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              {...register("quantity", { required: "Quantity is required" })}
              className={`w-full p-2 border ${
                errors.quantity ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter quantity"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Reorder Level
            </label>
            <input
              type="number"
              {...register("reorder_level", {
                required: "Reorder level is required",
              })}
              className={`w-full p-2 border ${
                errors.reorder_level ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter reorder level"
            />
            {errors.reorder_level && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reorder_level.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className={`w-full p-2 border ${
                errors.location ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter storage location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Add Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventory;
