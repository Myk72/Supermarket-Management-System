import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useProductStore } from "@/store/product.store";

const ProductDiscount = () => {
  const { id } = useParams();
  const { addDiscount } = useProductStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      product_id: id,
    },
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await addDiscount(parseInt(id), data);
      if (response) {
        alert("Discount added successfully!");
      } else {
        alert("Failed to add discount. Please try again.");
      }
    } catch (error) {
      console.error("Error adding discount:", error);
      alert("An error occurred while adding the discount. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md font-serif">
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="ml-2 size-4" />
        Back
      </Button>

      <h1 className="text-2xl font-semibold mb-4 text-blue-800">
        Product Discount for Product ID: {id}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Discount Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Discount name is required" })}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2`}
            placeholder="Enter discount title"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Discount Percentage
          </label>
          <input
            type="number"
            {...register("percentage", {
              required: "Discount percentage is required",
              min: {
                value: 0,
                message: "Percentage must be greater than 0",
              },
              max: {
                value: 100,
                message: "Percentage must be less than or equal to 100",
              },
            })}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2`}
            placeholder="Enter discount percentage"
          />
          {errors.percentage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.percentage.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Start Date
          </label>
          <input
            type="datetime-local"
            {...register("start_date", { required: "Start date is required" })}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2`}
            placeholder="Select start date"
          />
          {errors.start_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.start_date.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            End Date
          </label>
          <input
            type="datetime-local"
            {...register("end_date", { required: "End date is required" })}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2`}
            placeholder="Select end date"
          />
          {errors.end_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.end_date.message}
            </p>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <Button
            variant="primary"
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Submit Discount
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductDiscount;
