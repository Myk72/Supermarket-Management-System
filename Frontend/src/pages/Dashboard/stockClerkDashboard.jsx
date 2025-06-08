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

const ClerkDashboard = () => {
  const { suppliers } = useSupplierStore();
  useEffect(() => {
    useSupplierStore.getState().fetchSuppliers();
  }, []);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(suppliers.length / itemsPerPage);

  const currentItems = suppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
          <div className="flex flex-col gap-4 mt-4">
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
          {currentItems.length === 0 ? null : (
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClerkDashboard;
