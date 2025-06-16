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
import { usePurchaseStore } from "@/store/purchase.store";
import PagePagination from "@/components/PagePagination";

const ClerkDashboard = () => {
  const { suppliers } = useSupplierStore();
  const { fetchPurchases, purchases } = usePurchaseStore();
  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);
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
              description="Total Purchases made"
              value="0"
            />
          </div>
          <div className="w-full bg-white flex flex-col gap-4 py-4 rounded-2xl p-4 h-36 shadow-md">
            <h1 className="font-semibold">Quick Actions</h1>
            <div className="flex flex-row gap-6 w-full">
              <Button
                variant={"outline"}
                className={"px-10 py-6 space-x-2 w-3/10"}
                onClick={() => navigate("/purchases/add")}
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
                onClick={() => navigate("/purchases/checkin")}
              >
                <Users2 />
                <span className="text-lg">Check in Purchase</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white font-serif p-4 rounded-xl space-y-4">
          <h1 className="text-2xl font-bold">Recent Purchases</h1>
          <p>Your most recent Purchases transactions</p>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {currentItems.length > 0 ? (
              currentItems.map((purchase, index) => (
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h2 className="font-semibold text-lg">
                    Purchase ID: {purchase.purchase_id}
                  </h2>
                  <p>Supplier: {purchase.supplier.name}</p>
                  <p>Total Amount: ${purchase.total_cost}</p>
                  <p>
                    Purchase Expected Date:{" "}
                    {new Date(purchase.expected_date).toLocaleString()}
                  </p>
                  <p>
                    Status:{" "}
                    <span
                      className={`${
                        purchase.status === "pending"
                          ? "text-yellow-500"
                          : purchase.status === "received"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {purchase.status.toUpperCase()}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p>No transactions yet today</p>
            )}
          </div>
          <PagePagination
            Items={purchases}
            setCurrentItems={setCurrentItems}
            itemsPerPage={9}
          />
        </div>
      </div>
    </div>
  );
};

export default ClerkDashboard;
