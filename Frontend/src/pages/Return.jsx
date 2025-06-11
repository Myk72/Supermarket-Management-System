import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import Card from "@/components/card/card";
import { ReturnCard } from "@/components/Returns/ReturnsCard";
import { CustomTable } from "@/components/table/Table";
import ReturnsTableColumns from "@/components/columns/Returns";
import { useState } from "react";
import useAuthStore from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

const Return = () => {
  const returnTransactions = [
    {
      id: 6,
      saleNumber: 1098,
      customer: "Sarah Johnson",
      reason: "Customer Dissatisfaction",
      amount: "$59.99",
      date: "5/23/2025",
    },
    {
      id: 3,
      saleNumber: 1078,
      customer: "Sarah Johnson",
      reason: "Customer Dissatisfaction",
      amount: "$89.97",
      date: "5/17/2023",
    },
    // Adding more sample data to demonstrate pagination
    {
      id: 7,
      saleNumber: 1102,
      customer: "Michael Brown",
      reason: "Wrong Item Shipped",
      amount: "$45.50",
      date: "5/22/2025",
    },
    {
      id: 8,
      saleNumber: 1105,
      customer: "Emily Davis",
      reason: "Defective Product",
      amount: "$120.00",
      date: "5/21/2025",
    },
    {
      id: 9,
      saleNumber: 1110,
      customer: "Robert Wilson",
      reason: "Late Delivery",
      amount: "$75.25",
      date: "5/20/2025",
    },
  ];
  const { role } = useAuthStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(returnTransactions.length / itemsPerPage);

  const currentItems = returnTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="space-y-4 font-serif">
      <h1 className="text-2xl font-semibold text-blue-900">
        Returns Management
      </h1>
      {role === "manager" && (
        <div className="flex flex-col w-full h-screen gap-4">
          <div className="grid grid-cols-4 gap-4">
            {ReturnCard.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                icon={card.icon}
                value={card.value}
                description={card.description}
              />
            ))}
          </div>
          <div>
            <Tabs defaultValue="All" className="w-full">
              <TabsList
                className={"flex space-x-2 border text-xl bg-gray-100 rounded-none"}
              >
                <TabsTrigger
                  value="All"
                  className={"rounded-sm cursor-pointer p-2 text-xl"}
                >
                  All Returns
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className={"rounded-sm cursor-pointer p-2 text-xl"}
                >
                  Pending
                </TabsTrigger>
              </TabsList>
              <TabsContent value="All" className="py-2">
                <CustomTable
                  columns={ReturnsTableColumns}
                  data={[]}
                  addButtonText={"Add New Return"}
                  pageSize={5}
                  onAddClick={() => navigate("/returns/add")}
                />
              </TabsContent>
              <TabsContent value="pending">
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl font-bold text-blue-950">
                    Refund Requests
                  </h1>

                  <div className="space-y-4">
                    {currentItems.map((returnItem) => (
                      <div
                        key={returnItem.id}
                        className="flex flex-col gap-2 bg-white shadow-sm p-4 border-l-4 border-blue-500 hover:shadow-lg"
                      >
                        <div className="flex justify-between items-start">
                          <h2 className="text-lg font-semibold text-green-500">
                            Sale #{returnItem.saleNumber}
                          </h2>
                          <div className="flex space-x-2 items-center">
                            <p className="text-sm text-gray-500">Customer</p>
                            <p>{returnItem.customer}</p>
                          </div>
                          <span className="text-gray-500 text-sm">
                            Date: {returnItem.date}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Reason</p>
                            <p>{returnItem.reason}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="text-xl font-bold">
                              {returnItem.amount}
                            </p>
                          </div>

                          <div className="space-x-2">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                              Approve
                            </button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
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
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
      {role !== "manager" && (
        <CustomTable
          columns={ReturnsTableColumns}
          data={[]}
          addButtonText={"Add New Return"}
          pageSize={5}
          onAddClick={() => navigate("/returns/add")}
        />
      )}
    </div>
  );
};

export default Return;
