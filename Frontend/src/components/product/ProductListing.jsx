import { useState, useEffect } from "react";
import ProductSearchToolbar from "./ProductToolBar";
import ProductSalePagination from "./ProductSalePagination";
import ProductCard from "./productCard";
import { useProductStore } from "@/store/product.store";

export const ProductListing = ({ addToCart = () => {} }) => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const filteredProduct = products?.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const pageCount = Math.ceil(filteredProduct.length / itemsPerPage);
  const paginatedProduct = filteredProduct.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-6 p-4 w-2/3 rounded-lg bg-white shadow-md border">
      <h1 className="text-2xl font-semibold font-serif text-blue-900">Product List</h1>
      <div>
        <ProductSearchToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className="flex flex-wrap gap-6 pl-4">
        {paginatedProduct.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            onClick={() => addToCart(product)}
          />
        ))}
      </div>
      <div
      // put it at the bottom page
      className="mt-auto"
      > 
        <ProductSalePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};
