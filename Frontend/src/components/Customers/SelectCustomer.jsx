import React, { useEffect, useState } from "react";
import { CustomTable } from "../table/Table";
import { useCustomerStore } from "@/store/customers.store";
import CustomerColumns from "../columns/Customers";
import { useNavigate } from "react-router-dom";

const SelectCustomer = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { customers, fetchCustomers } = useCustomerStore();
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div>
      <CustomTable
        data={customers}
        columns={CustomerColumns}
        pageSize={5}
        onRowClick={(row) => {
          setSelectedCustomer(row);
          onSuccess(row);
        }}
      />
    </div>
  );
};

export default SelectCustomer;
