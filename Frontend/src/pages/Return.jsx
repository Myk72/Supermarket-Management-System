import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React, { useEffect } from "react";
import Card from "@/components/card/card";
import { ReturnCard } from "@/components/Returns/ReturnsCard";
import { CustomTable } from "@/components/table/Table";
import ReturnsTableColumns from "@/components/columns/Returns";
import { useState } from "react";
import useAuthStore from "@/store/auth.store";
import { useReturnStore } from "@/store/returns.store";
import { useNavigate } from "react-router-dom";

const Return = () => {
  const { role } = useAuthStore();
  const navigate = useNavigate();
  const {
    fetchReturns,
    returns,
    pendingReturns,
    fetchPendingReturns,
    returnCheck,
  } = useReturnStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(pendingReturns.length / itemsPerPage);

  const currentItems = pendingReturns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchReturns();
    fetchPendingReturns();
  }, [fetchReturns, fetchPendingReturns]);

  return (
    <div className="space-y-4 font-serif">
      <h1 className="text-2xl font-semibold text-blue-900">
        Returns Management
      </h1>
      {role === "manager" && (
        <div className="flex flex-col w-full gap-4">
          <ReturnCard returns={returns} />
          <div>
            <Tabs defaultValue="All" className="w-full">
              <TabsList
                className={
                  "flex space-x-2 border text-xl bg-gray-100 rounded-none"
                }
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
                  data={returns}
                  addButtonText={"Add New Return"}
                  pageSize={5}
                  onAddClick={() => navigate("/returns/add")}
                />
              </TabsContent>
              <TabsContent value="pending">
                {currentItems.length === 0 && (
                  <div className="flex items-center justify-center h-[50vh] bg-white rounded-2xl mt-2 shadow">
                    <p>No pending refund requests</p>
                  </div>
                )}
                {currentItems.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h1 className="text-xl font-bold text-blue-950">
                      Refund Requests
                    </h1>

                    <div className="space-y-4">
                      {currentItems.map((returnItem) => (
                        <div
                          key={returnItem.return_id}
                          className="flex flex-col gap-2 bg-white shadow-sm p-4 border-l-4 border-blue-500 hover:shadow-lg"
                        >
                          <div className="flex justify-between items-start">
                            <h2 className="text-lg font-semibold text-green-500">
                              Sale #{returnItem.sale_id}
                            </h2>
                            {/* {
                                "return_reason": "string",
                                "product_id": 2,
                                "sale_id": 2,
                                "status": "pending",
                                "processed_at": "2025-06-14T16:10:23",
                                "return_id": 2,
                                "quantity": 3,
                                "refund_amount": 0,
                                "processed_by": 1
                            } */}
                            <div className="flex space-x-2 items-center">
                              <p className="text-sm text-gray-500">
                                Processed BY
                              </p>
                              <p>{returnItem.processed_by}</p>
                            </div>
                            <span className="text-gray-500 text-sm">
                              Date:{" "}
                              {new Date(
                                returnItem.processed_at
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm text-gray-500">Reason</p>
                              <p>{returnItem.return_reason}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Amount</p>
                              <p className="text-xl font-bold">
                                {returnItem.refund_amount}
                              </p>
                            </div>

                            <div className="space-x-2">
                              <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                                onClick={async () => {
                                  try {
                                    const response = returnCheck(
                                      returnItem.return_id,
                                      "approved"
                                    );
                                    if (response) {
                                      await fetchReturns();
                                      await fetchPendingReturns();
                                    }
                                  } catch (error) {
                                    console.error(
                                      "Error approving return:",
                                      error
                                    );
                                  }
                                }}
                              >
                                Approve
                              </button>
                              <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                                onClick={() => {
                                  try {
                                    const response = returnCheck(
                                      returnItem.return_id,
                                      "rejected"
                                    );
                                    if (response) {
                                      fetchReturns();
                                      fetchPendingReturns();
                                    }
                                  } catch (error) {
                                    console.error(
                                      "Error rejecting return:",
                                      error
                                    );
                                  }
                                }}
                              >
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
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
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
                        ))}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={
                          currentPage === totalPages || totalPages === 0
                        }
                        className={`px-4 py-2 rounded ${
                          currentPage === totalPages || totalPages === 0
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
      {role !== "manager" && (
        <CustomTable
          columns={ReturnsTableColumns}
          data={returns}
          addButtonText={"Add New Return"}
          pageSize={5}
          onAddClick={() => navigate("/returns/add")}
        />
      )}
    </div>
  );
};

export default Return;
