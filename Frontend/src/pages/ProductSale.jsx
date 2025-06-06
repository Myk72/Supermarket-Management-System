import { ProductListing } from "@/components/product/ProductListing";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/auth.store";
import { useCustomerStore } from "@/store/customers.store";
import { useProductStore } from "@/store/product.store";
import { useSaleStore } from "@/store/sales.store";
import { ShoppingCart, Trash2, UserPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );
  };
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product_id !== productId)
    );
  };

  return (
    <div className="flex flex-row gap-4 max-h-screen">
      <ProductListing addToCart={(product) => addToCart(product)} />
      <div className="w-1/3 shadow-md bg-white p-4 rounded-lg border font-serif">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-900">Current Sale</h1>
          <UserPlus
            className="w-10 h-10 text-blue-600 p-2 rounded-md hover:cursor-pointer hover:bg-gray-200 transition-all duration-300"
            onClick={() => alert("CHoose a customer")}
          />
        </div>

        <div className="sapce-y-2 overflow-y-auto h-80">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
              <ShoppingCart className="h-12 w-12 mb-2" />
              <p>Cart is empty</p>
              <p className="text-sm">Scan items or select products to add</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 p-4">
              {cart.map((item) => (
                <div>
                  <div
                    key={item.product_id}
                    className="p-2 flex items-center justify-between rounded-2xl hover:bg-gray-100 transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateCartItemQuantity(
                            item.product_id,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateCartItemQuantity(
                            item.product_id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeFromCart(item.product_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Items:</span>
            <span>
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Subtotal ($):</span>
            <span>
              {cart
                .reduce(
                  (total, item) =>
                    total +
                    item.quantity * item.price * (1 - item.discount / 100),
                  0
                )
                .toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Tax ($):</span>
            <span>
              {cart
                .reduce(
                  (total, item) =>
                    total +
                    item.quantity *
                      item.price *
                      (1 - item.discount / 100) *
                      (item.tax / 100),
                  0
                )
                .toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Total ($):</span>
            <span>
              {cart
                .reduce((total, item) => {
                  const discountedPrice =
                    item.price * (1 - item.discount / 100);
                  const itemSubtotal = discountedPrice * item.quantity;
                  const itemTax = itemSubtotal * (item.tax / 100);
                  return total + itemSubtotal + itemTax;
                }, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 gap-3">
          <Button
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all duration-300 w-1/2"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          <Button
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300 w-1/2"
            // onClick={processPayment}
          >
            Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductSale;




