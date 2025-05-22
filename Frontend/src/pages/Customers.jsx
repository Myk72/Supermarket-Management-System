import React, { useEffect, useState } from "react";
import { CustomTable } from "@/components/table/Table";
import CustomerColumns from "@/components/columns/Customers";
import { useCustomerStore } from "@/store/customers.store";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
const Customers = () => {
  const { customers, fetchCustomers } = useCustomerStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCustomers();
  }, []);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold text-blue-900">
        List Of All Customers
      </h1>
      <div className="flex space-x-3 w-full">
        <div className="w-2/3 bg-white p-4 rounded-2xl">
          <CustomTable
            columns={CustomerColumns}
            data={customers}
            addButtonText="Add Customer"
            onAddClick={() => {
              navigate("/customers/add");
            }}
            onRowClick={(row) => {
              console.log("View Customer", row);
              setSelectedCustomer(row);
            }}
          />
        </div>
        <div className="w-1/3 bg-white p-4 rounded-2xl">
          <h2 className="text-lg font-semibold text-blue-900">
            Customer Details
          </h2>
          <div className="flex justify-center items-center h-full flex-col">
            {selectedCustomer ? (
              <div className="text-center">
                <p className="text-lg font-semibold">{selectedCustomer.name}</p>
                <p className="text-sm text-gray-500">
                  {selectedCustomer.phone}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedCustomer.email}
                </p>
                <p className="text-sm text-gray-500">
                  Loyalty Points: {selectedCustomer.loyalty_points}
                </p>
                <p className="text-sm text-gray-500">
                  Customer ID: {selectedCustomer.customer_id}
                </p>
              </div>
            ) : (
              <div>
                <Users className="h-16 w-16" />
                <p className="text-sm text-gray-500">
                  Select a customer to view
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
