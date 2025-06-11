import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useSupplierStore } from "@/store/suppliers.store";
import { useProductStore } from "@/store/product.store";
import { CustomTable } from "../table/Table";
import SelectProductColumns from "../columns/SelectProduct";
import { Package, ShoppingCart, Trash2 } from "lucide-react";

const AddPurchase = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { suppliers, fetchSuppliers } = useSupplierStore();
  const { products, fetchProducts } = useProductStore();
  const [cart, setCart] = useState([]);
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

  useEffect(() => {
    fetchSuppliers();
    fetchProducts();
  }, [fetchSuppliers, fetchProducts]);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col justify-center font-serif gap-2 bg-white rounded-2xl p-10">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="bg-gray-50 hover:bg-gray-200"
          onClick={() => {
            window.history.back();
          }}
        >
          <FaArrowLeft className="size-4" />
          Back
        </Button>
      </div>
      <div className="flex justify-center items-center flex-col gap-4">
        <h1 className="font-semibold text-2xl text-blue-500">
          Place New Purchase
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="font-serif w-full space-y-2"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col font-serif gap-2">
              <label htmlFor="supplier" className="font-semibold">
                Supplier
              </label>
              <select
                id="supplier"
                {...register("supplier", { required: "Supplier is required" })}
                className={`p-3 border rounded-md`}
              >
                <option value="">Select a supplier</option>
                {suppliers.map((supplier) => (
                  <option
                    key={supplier.supplier_id}
                    value={supplier.supplier_id}
                  >
                    {supplier.name}
                  </option>
                ))}
              </select>
              {errors.supplier && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.supplier.message}
                </span>
              )}
            </div>
            <div>
              <div className="flex flex-col font-serif gap-2">
                <label htmlFor="expectedDate" className="font-semibold">
                  Expected Date
                </label>
                <input
                  type="date"
                  id="expectedDate"
                  {...register("expectedDate", {
                    required: "Expected date is required",
                  })}
                  className={`p-3 border rounded-md`}
                />
                {errors.expectedDate && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.expectedDate.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col font-serif gap-2 w-full">
            <label htmlFor="notes" className="font-semibold">
              Notes
            </label>
            <textarea
              id="notes"
              {...register("notes")}
              className={`p-3 border rounded-md`}
              rows={2}
            />
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-bold">Select an Item</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomTable
              columns={SelectProductColumns}
              data={products}
              pageSize={5}
              onRowClick={(row) => addToCart(row)}
            />
            <div className="space-y-2 overflow-y-auto h-80  border-x ml-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
                  <Package className="h-12 w-12 mb-2" />
                  <p>Select Product</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 p-4">
                  {cart.map((item) => (
                    <div
                      key={item.product_id}
                      className="p-2 flex items-center justify-between rounded-lg hover:bg-gray-100 transition-all duration-300 border"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.cost_price.toFixed(2)} each
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
                  ))}
                </div>
              )}
            </div>
          </div>

          {cart.length > 0 && (
            <div className="flex justify-end mt-4 gap-2">
              <Button onClick={clearCart}>Clear Cart</Button>
              <Button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                <ShoppingCart className="mr-2" />
                Place Purchase
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPurchase;
