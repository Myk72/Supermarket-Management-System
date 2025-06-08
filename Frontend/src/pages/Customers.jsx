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
  const [purchasedHistory, setPurchasedHistory] = useState([]);
  return (
    <div className="space-y-3 font-serif">
      <h1 className="text-xl font-semibold text-blue-900">
        Customers
      </h1>
      <div className="flex space-x-3 w-full">
        <div className="w-2/3 bg-white p-4 rounded-2xl border shadow-sm">
          <CustomTable
            columns={CustomerColumns}
            data={customers}
            addButtonText="Add Customer"
            pageSize={8}
            onAddClick={() => {
              navigate("/customers/add");
            }}
            onRowClick={(row) => {
              console.log("View Customer", row);
              setSelectedCustomer(row);
            }}
          />
        </div>
        <div className="w-1/3 bg-white p-4 rounded-2xl border shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-700">
            Customer Details
          </h2>
          <div className="flex  h-full flex-col mt-6">
            {selectedCustomer ? (
              <div className="flex flex-col gap-4 ml-2">
                <h2 className=" flex flex-col gap-1 text-xl font-semibold text-blue-900">
                  {selectedCustomer.name}
                  <span className="text-sm text-gray-500 font-light">
                    Customer Since{" "}
                    {new Date(selectedCustomer.created_at).toLocaleDateString()}
                  </span>
                </h2>
                <h2 className=" flex flex-col gap-1 text-xl font-semibold text-blue-900">
                  Phone Number
                  <span className="text-sm text-gray-500 font-light">
                    {selectedCustomer.phone}
                  </span>
                </h2>
                <h2 className=" flex flex-col gap-1 text-xl font-semibold text-blue-900">
                  Email
                  <span className="text-sm text-gray-500 font-light">
                    {selectedCustomer.email}
                  </span>
                </h2>
                <h2 className="flex flex-col gap-1 text-xl font-semibold text-blue-900">
                  Loyality Point
                  <div className="text-sm text-gray-500 mt-1 font-light">
                    <span className="rounded-lg border p-1">
                      {selectedCustomer.loyalty_points || 0}
                    </span>{" "}
                    points available
                  </div>
                </h2>
                <h2 className="flex flex-col gap-1 text-xl font-semibold text-blue-900">
                  ID
                  <div className="text-sm text-gray-500 mt-1 font-light">
                    <span>
                      Identification Type: {selectedCustomer.id_type || "N/A"}
                    </span>
                    <br />
                    <span>
                      ID Number: {selectedCustomer.id_number || "N/A"}
                    </span>
                  </div>
                </h2>

                <h2 className="flex flex-col gap-1 text-xl font-semibold text-blue-900">
                  Purchased History
                  {purchasedHistory.length > 0 ? (
                    <div className="text-sm text-gray-500 mt-1 font-light">
                      <span>{purchasedHistory.length} purchases</span>
                      <span>
                        Last Purchase:{" "}
                        {new Date(
                          purchasedHistory[
                            purchasedHistory.length - 1
                          ].purchase_date
                        ).toLocaleDateString()}
                      </span>
                      <br />
                      <span>
                        Total Spent: $
                        {purchasedHistory
                          .reduce((acc, curr) => acc + curr.amount, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500 mt-1 font-light">
                      No purchase history available
                    </span>
                  )}
                </h2>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center p-10">
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
