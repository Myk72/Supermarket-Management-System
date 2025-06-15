import React, { useEffect, useState } from "react";
import { CustomTable } from "@/components/table/Table";
import CustomerColumns from "@/components/columns/Customers";
import { useCustomerStore } from "@/store/customers.store";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
const Customers = () => {
  const { customers, fetchCustomers, fetchPurchasedHistory, purchasedHistory } =
    useCustomerStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCustomers();
    fetchPurchasedHistory();
  }, [fetchCustomers, fetchPurchasedHistory]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <div className="space-y-3 font-serif">
      <h1 className="text-xl font-semibold text-blue-900">Customers</h1>
      <div className="flex space-x-3 w-full">
        <div className="w-2/3 bg-white p-4 rounded-2xl border shadow-sm">
          <CustomTable
            columns={CustomerColumns}
            data={customers}
            addButtonText="Add Customer"
            pageSize={10}
            onAddClick={() => {
              navigate("/customers/add");
            }}
            onRowClick={async (row) => {
              await fetchPurchasedHistory(row.customer_id);
              setSelectedCustomer(row);
            }}
          />
        </div>
        <div className="w-1/3 bg-white p-4 rounded-2xl border shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-700">
            Customer Details
          </h2>
          <div className="flex  h-full flex-col mt-6 max-h-[70vh] overflow-y-auto">
            {selectedCustomer ? (
              <div className="flex flex-col gap-4 ml-2">
                <h2 className=" flex flex-col gap-1 text-xl font-semibold text-blue-900">
                  {selectedCustomer.firstName} {selectedCustomer.lastName}
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
                      Identification Type:{" "}
                      {selectedCustomer.idType.toUpperCase() || "N/A"}
                    </span>
                    <br />
                    <span>ID Number: {selectedCustomer.idNumber || "N/A"}</span>
                  </div>
                </h2>

                <h2 className="flex flex-col gap-1 text-xl font-semibold text-blue-900">
                  Purchased History
                  {purchasedHistory.length > 0 ? (
                    <div className="text-sm text-gray-500 mt-1 font-light">
                      {/* Purchased History format[
                          {
                            "total_amount": 207,
                            "sale_id": 2,
                            "discount_amount": 0,
                            "sale_date": "2025-06-12T22:27:57",
                            "employee_id": 1,
                            "tax_amount": 27,
                            "customer_id": 1,
                            "payment_method": "cash"
                          }, */}
                      <span>{purchasedHistory.length} purchases</span>
                      <ul className="mt-2 space-y-1">
                        {purchasedHistory.map((purchase) => (
                          <li
                            key={purchase.sale_id}
                            className="flex justify-between items-center p-2 border-b border-gray-200"
                          >
                            <span>
                              Sale #{purchase.sale_id} -{" "}
                              {new Date(purchase.sale_date).toLocaleDateString()}
                            </span>
                            <span className="font-medium">
                              ${purchase.total_amount.toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
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
