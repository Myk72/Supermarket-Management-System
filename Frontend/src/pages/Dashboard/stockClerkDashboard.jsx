import Card from "@/components/card/card";
import React, { useEffect, useState } from "react";

import {
  LucideBadgeDollarSign,
  Package,
  ShoppingBasket,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSupplierStore } from "@/store/suppliers.store";
import PagePagination from "@/components/PagePagination";

const ClerkDashboard = () => {
  const { suppliers } = useSupplierStore();
  useEffect(() => {
    useSupplierStore.getState().fetchSuppliers();
  }, []);
  const navigate = useNavigate();

  const [currentItems, setCurrentItems] = useState([]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Stock Clerk Dashboard</h1>
      <p className="text-gray-600">Welcome to the clerk Dashboard</p>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="w-1/4 py-4">
            <Card
              title="Total Purchases"
              icon={LucideBadgeDollarSign}
              description="Total sales made today"
              value="0"
            />
          </div>
          <div className="w-full bg-white flex flex-col gap-4 py-4 rounded-2xl p-4 h-36 shadow-md">
            <h1 className="font-semibold">Quick Actions</h1>
            <div className="flex flex-row gap-6 w-full">
              <Button
                variant={"outline"}
                className={"px-10 py-6 space-x-2 w-3/10"}
                onClick={() => navigate("/purchases")}
              >
                <ShoppingBasket />
                <span className="text-lg">New Purchase</span>
              </Button>
              <Button
                variant={"outline"}
                className={"px-10 py-6 space-x-2 w-3/10"}
                onClick={() => navigate("/products")}
              >
                <Package />
                <span className="text-lg">Check Products</span>
              </Button>
              <Button
                variant={"outline"}
                className={"px-10 py-6 space-x-2 w-3/10"}
                onClick={() => navigate("/suppliers")}
              >
                <Users2 />
                <span className="text-lg">Check Suppliers</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white font-serif p-4 rounded-xl">
          <h1 className="text-2xl font-bold">Recent Purchases</h1>
          <p>Your most recent Purchases transactions</p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {currentItems.length > 0 ? (
              currentItems.map((sale, index) => (
                <div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h2 className="font-semibold text-lg">
                      Purchase ID: {sale.sale_id}
                    </h2>
                    <p>Supplier ID: {sale.supplier_id || "Guest"}</p>
                    <p>Total Amount: ${sale.total_amount.toFixed(2)}</p>
                    <p>
                      Purchase Date: {new Date(sale.sale_date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No transactions yet today</p>
            )}
          </div>
          <PagePagination
            Items={suppliers}
            setCurrentItems={setCurrentItems}
            itemsPerPage={9}
          />
        </div>
      </div>
    </div>
  );
};

export default ClerkDashboard;
