import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { CustomTable } from "../table/Table";
import SelectSalesColumns from "../columns/SelectSales";
import { ArrowRightCircle, Package, Trash2 } from "lucide-react";
import { useSaleStore } from "@/store/sales.store";
import { useReturnStore } from "@/store/returns.store";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth.store";

const AddReturns = () => {
  const navigate = useNavigate();
  const [sale, setSale] = useState([]);
  const [saleId, setSaleId] = useState("");
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("sale");
  const { fetchSales, saleItems, fetchSaleItems, sales } = useSaleStore();
  const { createReturn } = useReturnStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const [cart, setCart] = useState([]);
  const taxRate = 0.15;

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
            ? {
                ...item,
                quantity:
                  item.quantity + (product.quantity >= item.quantity + 1),
              }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, reason: "" }];
      }
    });
  };

  const handleChangeReason = (e, product_id) => {
    const reason = e.target.value;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product_id === product_id ? { ...item, reason } : item
      )
    );
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const maxQuantity = products.find(
      (item) => item.product_id === productId
    ).quantity;
    console.log(maxQuantity, quantity);
    if (quantity > maxQuantity) {
      alert("Max Quantity limit");
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

  const handleSubmit = async () => {
    try {
      await createReturn({
        sale_id: saleId,
        products: cart.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          reason: item.reason,
          total_refund: (
            item.unit_price *
            item.quantity *
            (1 + taxRate)
          ).toFixed(2),
        })),
        processed_by: user.employee_id,
      });
      alert("Return processed successfully");
      setCart([]);
      setSale([]);
      setProducts([]);
      setActiveTab("sale");
    } catch (error) {
      console.error("Error processing return:", error);
      alert("Failed to process return. Please try again.");
      return;
    }
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-2xl ">
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

      <div className="flex flex-col gap-4 font-serif">
        <h1 className="font-semibold text-2xl">Add New Return</h1>
        <Tabs value={activeTab} className="w-full">
          <TabsList
            className={
              "grid grid-cols-3 gap-2 border bg-gray-100 rounded-none p-1"
            }
          >
            <TabsTrigger
              value="sale"
              className={`cursor-pointer p-2 data-[state=active]:bg-white`}
              onClick={() => setActiveTab("sale")}
            >
              Find Sale
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className={"cursor-pointer p-2 data-[state=active]:bg-white"}
              onClick={() => setActiveTab("products")}
              disabled={!sale.length}
            >
              Select Products
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className={"cursor-pointer p-2 data-[state=active]:bg-white"}
              onClick={() => setActiveTab("summary")}
              disabled={ !cart.length ||
                cart.some(
                  (item) => !item.reason || item.reason.trim() === ""
                ) ||
                !sale.length ||
                !products.length
              }
            >
              Summary
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sale" className="py-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-blue-900">
                Search for Sale
              </h2>
              <div className="felx flex-row">
                <input
                  type="text"
                  placeholder="Enter Sale ID"
                  className="p-2 border rounded-md mr-4 w-1/3"
                  onChange={(e) => setSaleId(e.target.value)}
                />
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer w-1/5"
                  onClick={() => {
                    const currentSale = sales.find(
                      (sale) => sale.sale_id === parseInt(saleId)
                    );
                    if (currentSale) {
                      setSale([currentSale]);
                      fetchSaleItems(currentSale.sale_id);
                      setProducts(saleItems);
                    } else {
                      alert("Sale not found");
                      setSale([]);
                      setProducts([]);
                    }
                  }}
                >
                  Search
                </Button>
              </div>

              {sale.length > 0 && (
                <div className="p-4 border rounded-2xl">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="font-semibold">Sale ID:</span>
                      <span>{sale[0].sale_id}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Customer ID:</span>
                      <span>{sale[0].customer_id}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Employee ID:</span>
                      <span>{sale[0].employee_id}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Total Amount:</span>
                      <span>{formatCurrency(sale[0].total_amount)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Tax Amount:</span>
                      <span>{formatCurrency(sale[0].tax_amount)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Discount Amount:</span>
                      <span>{formatCurrency(sale[0].discount_amount)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Payment Method:</span>
                      <span>{sale[0].payment_method}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Sale Date:</span>
                      <span>
                        {new Date(sale[0].sale_date).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className={
                        "bg-blue-600 hover:bg-blue-700 text-white mt-5 cursor-pointer w-1/4"
                      }
                      onClick={() => {
                        setActiveTab("products");
                      }}
                    >
                      Select Sale
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="products" className="py-2">
            <div className="flex flex-col gap-4 px-4">
              <h2 className="text-lg font-semibold text-blue-900">
                Select Products for Return
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <CustomTable
                  columns={SelectSalesColumns}
                  data={saleItems}
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
                        <div className="space-y-2 border rounded-lg p-2">
                          <div
                            key={item.product_id}
                            className="flex items-center justify-between hover:bg-gray-100 transition-all duration-300"
                          >
                            <div className="flex-1">
                              <div className="flex flex-row gap-2">
                                <h1 className="font-semibold">Product ID:</h1>
                                <span className="font-sans">
                                  {item.product_id}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                ${item.unit_price.toFixed(2)} each
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
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  updateCartItemQuantity(
                                    item.product_id,
                                    item.quantity + 1
                                  );
                                }}
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
                          <div className="flex flex-row gap-2 items-center">
                            <label htmlFor="notes" className="font-semibold">
                              Reason
                            </label>
                            <textarea
                              id="reason"
                              className={`p-3 border rounded-md w-full`}
                              rows={1}
                              value={item.reason}
                              onChange={(e) => {
                                e.preventDefault();
                                handleChangeReason(e, item.product_id);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {cart.length > 0 && (
                <div className="flex justify-end mt-4 gap-2 w-full px-2">
                  <Button onClick={clearCart}>Clear Cart</Button>
                  <Button
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => {
                      const hasEmptyReason = cart.some(
                        (item) => !item.reason || item.reason.trim() === ""
                      );

                      if (hasEmptyReason) {
                        alert(
                          "Please provide a reason for all items before proceeding"
                        );
                      } else {
                        setActiveTab("summary");
                      }
                    }}
                  >
                    <ArrowRightCircle className="mr-1" />
                    Next
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="summary" className="py-4">
            <div className="font-serif p-2 space-y-2">
              <h1 className="text-2xl font-semibold ">Return Summary</h1>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2 border-r px-2">
                  <div className="flex justify-between p-2 hover:bg-gray-50 rounded-2xl border-b rounded-b-none">
                    <span className="">Original Sale Total:</span>
                    <span>
                      {formatCurrency(sale[0]?.total_amount?.toFixed(2))}
                    </span>
                  </div>
                  <div className="flex justify-between p-2 hover:bg-gray-50 rounded-2xl border-b rounded-b-none">
                    <span className="">Items Being Returned:</span>
                    <span>{cart.length}</span>
                  </div>
                  <div className="flex justify-between p-2 hover:bg-gray-50 rounded-2xl border-b rounded-b-none">
                    <span className="">Return Subtotal:</span>
                    <span>
                      {formatCurrency(
                        cart.reduce(
                          (acc, item) => acc + item.unit_price * item.quantity,
                          0
                        )
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between p-2 hover:bg-gray-50 rounded-2xl border-b rounded-b-none">
                    <span className="">Tax Refund:</span>
                    <span>
                      {formatCurrency(
                        cart.reduce(
                          (acc, item) => acc + item.unit_price * item.quantity,
                          0
                        ) * taxRate
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between font-bold text-lg hover:bg-gray-50 rounded-2xl p-2">
                    <span>Total Refund:</span>
                    <span>
                      {formatCurrency(
                        cart.reduce(
                          (acc, item) => acc + item.unit_price * item.quantity,
                          0
                        ) +
                          cart.reduce(
                            (acc, item) =>
                              acc + item.unit_price * item.quantity,
                            0
                          ) *
                            taxRate
                      )}
                    </span>
                  </div>
                </div>
                <CustomTable
                  columns={[
                    {
                      id: "product_id",
                      accessorKey: "product_id",
                      header: "Product ID",
                      size: 20,
                    },
                    {
                      id: "quantity",
                      header: "Quantity",
                      accessorKey: "quantity",
                      size: 40,
                    },
                    {
                      id: "reason",
                      header: "Reason",
                      accessorKey: "reason",
                      size: 40,
                    },
                    {
                      id: "total_refund",
                      header: "Total Refund",
                      cell: ({ row }) => (
                        <span>
                          {formatCurrency(
                            row.original.unit_price *
                              row.original.quantity *
                              (1 + taxRate)
                          )}
                        </span>
                      ),
                      size: 40,
                    },
                  ]}
                  data={cart}
                  pageSize={6}
                />
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button
                  variant="outline"
                  className="bg-gray-50 hover:bg-gray-200"
                  onClick={() => setActiveTab("products")}
                >
                  Back
                </Button>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Process Return
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AddReturns;
