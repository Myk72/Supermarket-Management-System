import React, { useEffect } from "react";

import { CustomTable } from "@/components/table/Table";
import ProductColumns from "@/components/columns/Product";
import { useProductStore } from "@/store/product.store";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import { Button } from "@/components/ui/button";

const Product = () => {
  const { fetchProducts, products, deleteProduct } = useProductStore();
  const { role } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-2 font-serif">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold text-2xl text-blue-900">Products</h1>
        {role === "manager" && (
          <Button
            variant={"default"}
            className=" p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            onClick={() => navigate("/category/add")}
          >
            Add New Category
          </Button>
        )}
      </div>
      <CustomTable
        data={products}
        columns={ProductColumns}
        {...(role === "manager" && {
          addButtonText: "Add Product",
        })}
        onAddClick={() => {
          navigate("/products/add");
        }}
        pageSize={6}
        meta={{
          onViewClick: (row) => {
            console.log("View Product", row);
            navigate("/products/view/" + row.product_id);
          },
          onDiscountClick: (row) => {
            console.log("Edit Product", row);
            navigate("/products/discount/" + row.product_id);
          },
          onDeleteClick: async (row) => {
            console.log(row);
            await deleteProduct(row.product_id);
            console.log("Delete Product", row);
          },
        }}
      />
    </div>
  );
};

export default Product;
