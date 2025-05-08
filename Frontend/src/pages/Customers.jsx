import React, { useEffect } from "react";
import { CustomTable } from "@/components/table/Table";
import CustomerColumns from "@/components/columns/Customers";
import { useCustomerStore } from "@/store/customers.store";
const Customers = () => {
  const { customers, fetchCustomers } = useCustomerStore();
  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">List Of All Customers</h1>
      <CustomTable columns={CustomerColumns} data={customers} />
    </div>
  );
};

export default Customers;
