import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/product.store";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { Edit, Trash2 } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { fetchProductById, product } = useProductStore();

  useEffect(() => {
    fetchProductById(Number(id));
  }, [id]);

  return (
    <div className="flex flex-col font-serif gap-4 p-4 min-h-screen">
      <Button
        variant="outline"
        className="w-fit bg-white hover:bg-gray-100 shadow"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft className="size-4" />
        Back
      </Button>

      <h1 className="font-bold text-3xl text-center text-blue-800">
        Product Details
      </h1>

      {product ? (
        <div className="bg-white rounded-2xl shadow-md p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="size-64 object-cover rounded-xl border"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p>
              <span className="font-medium text-gray-600">Barcode:</span>{" "}
              {product.barcode}
            </p>
            <p>
              <span className="font-medium text-gray-600">Price:</span> $
              {product.price}
            </p>
            <p>
              <span className="font-medium text-gray-600">Cost Price:</span> $
              {product.cost_price}
            </p>
            <p>
              <span className="font-medium text-gray-600">Status:</span>
              <span
                className={`ml-1 px-2 py-1 rounded-full text-sm ${
                  product.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.status}
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-600">Category:</span>{" "}
              {product.category?.name}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No product found.</p>
      )}

      {product?.expiry_trackers?.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow space-y-2">
          <h3 className="font-semibold text-lg mb-2">Expiry Info</h3>
          {product.expiry_trackers.map((exp) => (
            <div key={exp.expiry_id} className="text-sm text-gray-700">
              <p>
                <strong>Batch:</strong> {exp.batch_number}
              </p>
              <p>
                <strong>Expires on:</strong>{" "}
                {new Date(exp.expiry_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {product?.discounts?.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow space-y-2">
          <h3 className="font-semibold text-lg mb-2">Active Discounts</h3>
          {product.discounts.map((discount) => (
            <div key={discount.discount_id} className="text-sm text-gray-700">
              <p>
                <strong>Name:</strong> {discount.name}
              </p>
              <p>
                <strong>Percentage:</strong> {discount.percentage}%
              </p>
              <p>
                <strong>Valid:</strong>{" "}
                {new Date(discount.start_date).toLocaleDateString()} -{" "}
                {new Date(discount.end_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
