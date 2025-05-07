import { ProductListing } from "@/components/product/ProductListing";
import { useAuthStore } from "@/store/auth.store";
import { useCustomerStore } from "@/store/customers.store";
import { useProductStore } from "@/store/product.store";
import { useSaleStore } from "@/store/sales.store";
import { ShoppingCart, UserPlus } from "lucide-react";
import React, { useEffect, useState } from "react";

const ProductSale = () => {
  const { products, fetchProducts } = useProductStore();
  const { createSale } = useSaleStore();
  const { customers, fetchCustomers } = useCustomerStore();
  const { user } = useAuthStore();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, [fetchProducts, fetchCustomers]);

  const handleBarcodeScan = (e) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    const product = products.find((p) => p.barcode === barcodeInput);
    if (product) {
      addToCart(product);
    } else {
      alert("Product not found");
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product_id === product.product_id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="p-1 flex flex-row gap-4 h-screen">
      <ProductListing addToCart={(product) => addToCart(product)} />
      <div className="w-1/3 shadow-md bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold ">Current Sale</h1>
          <UserPlus
            className="w-10 h-10 text-blue-600 p-2 rounded-md hover:cursor-pointer hover:bg-gray-200 transition-all duration-300"
            onClick={() => alert("CHoose a customer")}
          />
        </div>

        <div className="sapce-y-2 overflow-y-auto h-3/5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
              <ShoppingCart className="h-12 w-12 mb-2" />
              <p>Cart is empty</p>
              <p className="text-sm">Scan items or select products to add</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 p-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 p-4">
          <div className="flex justify-between items-center">
            <span className="font-bold">Total Items:</span>
            <span className="font-bold">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Total Price:</span>
            <span className="font-bold">$0.00</span>
          </div>
        </div>
        <button
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all duration-300"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default ProductSale;
