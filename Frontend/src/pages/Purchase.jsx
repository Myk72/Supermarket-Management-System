import PurchaseOrderColumns from "@/components/columns/Purchase";
import { PurchaseCard } from "@/components/Purchase/purchaseCard";
import { CustomTable } from "@/components/table/Table";
import { usePurchaseStore } from "@/store/purchase.store";
import useAuthStore from "@/store/auth.store";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Purchase = () => {
  const { purchases, fetchPurchases } = usePurchaseStore();
  const { role } = useAuthStore();
  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full font-serif gap-4">
      <h1 className="text-2xl font-semibold text-blue-900">Purchases</h1>
      <PurchaseCard />
      <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Purchase Orders</h2>
        <CustomTable
          columns={PurchaseOrderColumns}
          data={purchases}
          {...(role === "manager" && {
            addButtonText: "Add Purchase Order",
          })}
          pageSize={5}
          onAddClick={() => {
            navigate("/purchases/add");
          }}
          meta={{
            onViewClick: (row) => {
              // console.log("View", row);
              navigate("/purchases/view/" + row.purchase_id);
            },
          }}
        />
      </div>
    </div>
  );
};

export default Purchase;
