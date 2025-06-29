import { useState, useEffect, useMemo } from "react";
import ProductSearchToolbar from "./ProductToolBar";
import ProductCard from "./productCard";
import PagePagination from "../PagePagination";
import { useProductStore } from "@/store/product.store";

export const ProductListing = ({ addToCart = () => {}, scannedCode }) => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentProducts, setCurrentProducts] = useState([]);

  const filteredProduct = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return (
      products?.filter((product) => {
        const name = product?.name?.toLowerCase() || "";
        const status = product?.status?.toLowerCase() || "";
        return name.includes(search) || status.includes(search);
      }) || []
    );
  }, [products, searchTerm]);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 rounded-lg bg-white shadow-md border">
      <h1 className="text-2xl font-semibold font-serif text-blue-900">
        Product List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <ProductSearchToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <input
          type="text"
          placeholder="Barcode Scanner"
          value={scannedCode || ""}
          readOnly
          className="py-2 px-3 border rounded-2xl"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[400px]">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            onClick={() => addToCart(product)}
          />
        ))}
      </div>
      <PagePagination
        Items={filteredProduct}
        itemsPerPage={8}
        setCurrentItems={setCurrentProducts}
      />
    </div>
  );
};
