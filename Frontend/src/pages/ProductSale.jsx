import { ProductListing } from "@/components/product/ProductListing";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/auth.store";
import { useCustomerStore } from "@/store/customers.store";
import { useProductStore } from "@/store/product.store";
import { useSaleStore } from "@/store/sales.store";
import {
  ShoppingCart,
  Trash2,
  UserPlus,
  DollarSign,
  CreditCardIcon,
  Smartphone,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { use, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { io } from "socket.io-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectCustomer from "@/components/Customers/SelectCustomer";

const ProductSale = () => {
  const { products, fetchProducts } = useProductStore();
  const { createSale } = useSaleStore();
  const { customers, fetchCustomers } = useCustomerStore();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { user } = useAuthStore();

  const [cart, setCart] = useState([]);
  const [scannedCode, setScannedCode] = useState("");
  const [taxAmount, setTaxAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const taxRate = 0.15;

  useEffect(() => {
    let subtotal = 0;
    let totalTax = 0;

    cart.forEach((item) => {
      const itemTax = item.price * taxRate * item.quantity;

      subtotal += item.price * item.quantity;
      totalTax += itemTax;
    });

    let loyaltyDiscount = 0;
    if (selectedCustomer && selectedCustomer.loyalty_points >= 500) {
      loyaltyDiscount = selectedCustomer.loyalty_points;
    }

    let discountAmount = 0;
    cart.forEach((item) => {
      const discount = item.discounts?.find(
        (d) =>
          new Date(d.start_date) <= new Date() &&
          new Date(d.end_date) >= new Date()
      );
      if (discount) {
        const discountValue = (item.price * discount.percentage) / 100;
        discountAmount += discountValue * item.quantity;
      }
    });

    const total = subtotal + totalTax - loyaltyDiscount - discountAmount;

    setTaxAmount(parseFloat(totalTax.toFixed(2)));
    setDiscountAmount(parseFloat(loyaltyDiscount.toFixed(2)) + discountAmount);
    setTotalAmount(parseFloat(total.toFixed(2)));
  }, [cart, selectedCustomer]);

  useEffect(() => {
    const socket = io("https://192.168.163.131:8000/", {
      reconnection: 5,
      timeout: 5000,
    });

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("register_display");
    });

    socket.on("initial-codes", (codes) => {
      setScannedCode(codes);
    });

    socket.on("scanned-code", (code) => {
      console.log("Scanned code:", code);
      setScannedCode(code);
      const product = products.find((p) => p.barcode === code);
      if (product) {
        addToCart(product);
      } else {
        alert("Product not found for scanned code: " + code);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, [fetchProducts, fetchCustomers]);

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (product) => {
    const stock_quantity = product?.inventory?.quantity;
    if (!stock_quantity || stock_quantity <= 0) {
      alert("This product is out of stock.");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product_id === product.product_id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product_id === product.product_id &&
          item.quantity < stock_quantity
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
      <ProductListing
        addToCart={(product) => addToCart(product)}
        scannedCode={scannedCode}
      />

      <div className="w-1/3 shadow-md bg-white p-4 rounded-lg border font-serif">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-900">Current Sale</h1>
          <UserPlus
            className="w-10 h-10 text-blue-600 p-2 rounded-md hover:cursor-pointer hover:bg-gray-200 transition-all duration-300"
            onClick={() => setOpenCustomerDialog(true)}
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
                        onClick={() => {
                          const stock_quantity = item?.inventory?.quantity;
                          if (stock_quantity <= item.quantity) {
                            alert("Cannot increase quantity beyond stock.");
                            return;
                          }
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
                .reduce((total, item) => total + item.quantity * item.price, 0)
                .toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Tax ($):</span>
            <span>{taxAmount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Discount ($):</span>
            <span>{discountAmount.toFixed(2)}</span>
          </div>

          {selectedCustomer && (
            <div className="flex justify-between items-center">
              <span className="font-semibold">
                Loyalty Points ({selectedCustomer.loyalty_points}):
              </span>
              {selectedCustomer.loyalty_points < 500 ? (
                <span className="text-red-600 text-xs">
                  Insufficent points for discount
                </span>
              ) : (
                <input
                  type="number"
                  placeholder="Points"
                  className="border rounded-md w-18 text-right"
                  onChange={(e) => setLoyaltyPoints(e.target.value)}
                  value={loyaltyPoints}
                />
              )}
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="font-semibold">Total ($):</span>
            <span>{totalAmount}</span>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 gap-3">
          <Button
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all duration-300 w-1/2 cursor-pointer"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          <Button
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300 w-1/2 cursor-pointer"
            onClick={() => {
              setPaymentDialogOpen(true);
            }}
          >
            Payment
          </Button>
        </div>
      </div>

      <Dialog open={openCustomerDialog} onOpenChange={setOpenCustomerDialog}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select Customer</DialogTitle>
            <DialogDescription>
              Choose a customer for this sale.
            </DialogDescription>
          </DialogHeader>
          <SelectCustomer
            onSuccess={(customer) => {
              setSelectedCustomer(customer);
              setOpenCustomerDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment</DialogTitle>
            <DialogDescription>
              Select a payment method to complete the sale.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Tabs value={paymentMethod} className="w-full mt-4 p-1 bg-gray-100">
              <TabsList className={"flex flex-row justify-between w-full"}>
                <TabsTrigger
                  value="cash"
                  className={" cursor-pointer p-4 text-xl"}
                  onClick={() => setPaymentMethod("cash")}
                >
                  <DollarSign className="mr-1" />
                  Cash
                </TabsTrigger>
                <TabsTrigger
                  value="mobile_money"
                  className={"cursor-pointer p-4 text-xl"}
                  onClick={() => setPaymentMethod("mobile_money")}
                >
                  <Smartphone className="mr-1" />
                  Mobile
                </TabsTrigger>
                <TabsTrigger
                  value="card"
                  className={"cursor-pointer p-4 text-xl"}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCardIcon className="mr-1" />
                  Card
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              className={
                "mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full cursor-pointer"
              }
              onClick={async () => {
                try {
                  await createSale({
                    payment_method: paymentMethod,
                    employee_id: user?.employee_id,
                    items: cart.map((item) => ({
                      product_id: item.product_id,
                      quantity: item.quantity,
                      unit_price: item.price,
                      subtotal: item.price * item.quantity,
                    })),
                    total_amount: totalAmount,
                    tax_amount: taxAmount,
                    discount_amount: discountAmount,
                    customer_id: selectedCustomer
                      ? selectedCustomer.customer_id
                      : -1,
                  });
                  setCart([]);
                  setSelectedCustomer(null);
                  setPaymentDialogOpen(false);
                  alert("Sale completed successfully!");
                } catch (error) {
                  console.error("Error creating sale:", error);
                }
              }}
            >
              Complete Sale
              <ShoppingCart className="ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductSale;
