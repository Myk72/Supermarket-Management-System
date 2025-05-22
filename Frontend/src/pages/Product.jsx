import React, { useEffect } from "react";

import { CustomTable } from "@/components/table/Table";
import ProductColumns from "@/components/columns/Product";
import { useProductStore } from "@/store/product.store";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { fetchProducts, products } = useProductStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-2 font-serif h-screen">
      <h1 className="font-semibold text-2xl text-blue-900">List of Products</h1>
      <CustomTable
        data={products}
        columns={ProductColumns}
        addButtonText="Add Product"
        onAddClick={() => {}}
        pageSize={6}
        meta={{
          onViewClick: (row) => {
            console.log("View Product", row);
            navigate("/products/view/" + row.product_id);
          },
          onEditClick: (row) => {
            console.log("Edit Product", row);
            alert(row.product_id + " Product ID edit");

          },
          onDeleteClick: (row) => {
            console.log("Delete Product", row);
            alert(row.product_id + " Product ID delete");
          },
        }}
      />
    </div>
  );
};

export default Product;
