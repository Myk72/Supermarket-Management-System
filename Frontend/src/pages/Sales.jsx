import { CustomTable } from "@/components/table/Table";
import React, { useEffect } from "react";
import { useSaleStore } from "@/store/sales.store";
import SalesColumns from "@/components/columns/Sales";

const Sales = () => {
  const { sales, fetchSales } = useSaleStore();
  useEffect(() => {
    fetchSales();
  }, []);
  console.log(sales);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold ">Sales Management</h1>
      <div className="bg-white p-6 rounded-2xl">
        <CustomTable
          columns={SalesColumns}
          data={sales}
          addButtonText={"Add New Sale"}
          pageSize={5}
        />
      </div>
    </div>
  );
};

export default Sales;
