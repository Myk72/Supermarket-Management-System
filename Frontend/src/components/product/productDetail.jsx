import React from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/product.store";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { Edit, Trash2 } from "lucide-react";
const ProductDetail = () => {
  const { id } = useParams();
  const { fetchProductById, products } = useProductStore();

  useEffect(() => {
    fetchProductById(Number(id));
  }, [id]);

  return (
    <div className="flex flex-col justify-center p-3 font-serif gap-2 bg-white rounded-2xl p-10">
      <div className="flex justify-between items-center">
        <Button
          variant={"outline"}
          className="bg-gray-100 hover:bg-gray-200"
          onClick={() => {
            window.history.back();
          }}
        >
          <FaArrowLeft className="size-4" />
          Back
        </Button>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="hover:bg-gray-200 bg-blue-100">
            <Edit className="size-4 text-blue-600" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-200 bg-red-100">
            <Trash2 className="size-4 text-red-600" />
          </Button>
        </div>
      </div>
      <div className="flex justify-center flex-col">
        <h1 className="font-semibold text-2xl">Product Details</h1>
        {products ? (
          <div className="space-y-2">
            <h2 className="text-xl">{products.name}</h2>
            <p>Price: ${products.price}</p>
            <p>Category: {products.category_id}</p>
            <img
              src={products.image}
              alt={products.name}
              className="size-32 object-cover"
            />
          </div>
        ) : (
          <p>No result</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
