import Card from "@/components/card/card";
import React, { useEffect, useState } from "react";

import {
  LucideBadgeDollarSign,
  Package,
  ShoppingBasket,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSaleStore } from "@/store/sales.store";
import useAuthStore from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import PagePagination from "@/components/PagePagination";

const CashierDashboard = () => {
  const { user } = useAuthStore();
  const { sales, getSaleByEmployeeId } = useSaleStore();
  useEffect(() => {
    if (user) {
      getSaleByEmployeeId(user.employee_id);
    }
  }, [getSaleByEmployeeId]);
  const navigate = useNavigate();
  const [currentItems, setCurrentItems] = useState([]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Cashier Dashboard</h1>
      <p className="text-gray-600">Welcome to the Cashier Dashboard.</p>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="w-1/4 py-4">
            <Card
              title="Total Sales"
              icon={LucideBadgeDollarSign}
              description="Total sales made today"
              value={sales
                .reduce((acc, sale) => acc + sale.total_amount, 0)
                .toFixed(2)}
            />
          </div>
          <div className="w-full bg-white flex flex-col gap-4 py-4 rounded-2xl p-4 h-36 shadow-md">
            <h1 className="font-semibold">Quick Actions</h1>
            <div className="flex flex-row gap-6 w-full">
              <Button
                variant={"outline"}
                className={"px-10 py-6 space-x-2 w-3/10"}
                onClick={() => navigate("/pos")}
              >
                <ShoppingBasket />
                <span className="text-lg">New Sale</span>
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
                onClick={() => navigate("/customers")}
              >
                <Users2 />
                <span className="text-lg">Customers Lookup</span>
              </Button>
            </div>
          </div>
        </div>

        <div className=" font-serif p-4 rounded-xl">
          <h1 className="text-2xl font-bold">Recent Transaction</h1>
          <p>Your most recent sales transactions</p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {currentItems.length > 0 ? (
              currentItems.map((sale, index) => (
                <div className="border-l-2 border-blue-600">
                  <div className="p-4 bg-white rounded-lg rounded-l-none shadow-md">
                    <h2 className="font-semibold text-lg">
                      Sale ID: {sale.sale_id}
                    </h2>
                    <p>Customer ID: {sale.customer_id || "Guest"}</p>
                    <p>Payment Method : {sale.payment_method}</p>
                    <p>Total Amount: ${sale.total_amount.toFixed(2)}</p>
                    <p>
                      Sale Date: {new Date(sale.sale_date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No transactions yet today</p>
            )}
          </div>
          <PagePagination
            Items={sales}
            setCurrentItems={setCurrentItems}
            itemsPerPage={9}
          />
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;
