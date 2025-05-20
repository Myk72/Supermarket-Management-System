import React from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/product.store";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
const ProductDetail = () => {
  const { id } = useParams();
  const { fetchProductById, products } = useProductStore();

  useEffect(() => {
    fetchProductById(Number(id));
  }, [id]);

  return (
    <div className="flex flex-col justify-center p-3 font-serif gap-2">
      <div>
        <Button
          variant={"outline"}
          className="bg-gray-100 hover:bg-gray-200"
          onClick={() => {
            window.history.back();
          }}
        >
          <FaArrowLeft className="size-6" />
          Back
        </Button>
      </div>
      <div className="flex justify-center flex-col">
        <h1 className="font-semibold text-2xl">Product Details</h1>
        {products ? (
          <div className="space-y-2">
            <h2 className="text-xl">{products.name}</h2>
            <p>Price: ${products.price}</p>
            <p>Category: {products.category_id}</p>
            <img src={products.image} alt={products.name} className="size-32 object-cover"/>
          </div>
        ) : (
          <p>No result</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
