import React from "react";
import { usePurchaseStore } from "@/store/purchase.store";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const CheckinPurchase = () => {
  const {
    purchases,
    fetchPurchases,
    fetchPurchaseItems,
    purchaseItems,
    updatePurchase,
  } = usePurchaseStore();
  const [purchaseId, setPurchaseId] = useState(null);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  return (
    <div className="font-serif p-2 space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">
        Check in Purchase
      </h1>
      <div className="flex flex-col gap-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-md">
        <Button
          variant={"outline"}
          className={"w-fit"}
          onClick={() => {
            window.history.back();
          }}
        >
          <FaArrowLeft className="size-4" />
          Back
        </Button>
        <div>
          <h2 className="text-lg font-semibold mb-2">Search Purchase</h2>
          <input
            type="text"
            placeholder="Search by Purchase ID"
            className="p-2 border border-gray-300 rounded w-1/2 mb-4 block"
            onChange={(e) => {
              setPurchaseId(parseInt(e.target.value));
              setSelectedPurchase(null);
            }}
          />
          <Button
            variant={"primary"}
            onChange={() => handleSearch(purchaseId)}
            onClick={async () => {
              const res = await fetchPurchaseItems(purchaseId);
              const CurrentPurchase = purchases.find(
                (p) => p.purchase_id === purchaseId && p.status === "pending"
              );
              
              if (!res || !CurrentPurchase) {
                alert("No purchase found with this ID ");
                setSelectedPurchase(null);
                return;
              }
              setSelectedPurchase(CurrentPurchase);
            }}
            className={"bg-blue-600 hover:bg-blue-700 text-white w-1/4"}
          >
            Search
          </Button>
        </div>
        
        {(selectedPurchase  && purchaseItems.length > 0) ? (
          <div className="space-y-6 h-72 overflow-auto">
            <h2 className="text-lg font-semibold mb-2">
              Purchase Items for order ID: {purchaseId}
            </h2>
            <h3 className="text-lg font-medium mb-2">
              From Supplier: {selectedPurchase?.supplier?.name}
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {purchaseItems.map((item) => (
                <div
                  key={item.purchase_item_id}
                  className="border rounded-lg bg-white px-4 py-2"
                >
                  <div className="text-indigo-600 my-2 font-semibold">
                    PIO #{item.purchase_item_id}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span>
                        Quantity:{" "}
                        <span className="font-medium">{item.quantity}</span>
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span>
                        Unit Price:{" "}
                        <span className="font-medium">
                          ${item.cost_price.toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant={"primary"}
                className="bg-green-600 hover:bg-green-700 text-white mb-2 cursor-pointer"
                onClick={async () => {
                  const res = await updatePurchase(purchaseId, "received");
                  if (res) {
                    alert("Purchase successfully checked in");
                  } else {
                    alert("Failed to check in purchase");
                  }
                }}
              >
                Approve
              </Button>
              <Button
                variant={"destructive"}
                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                onClick={async () => {
                  const res = updatePurchase(purchaseId, "cancelled");
                  if (res) {
                    alert("Purchase successfully rejected");
                  } else {
                    alert("Failed to reject purchase");
                  }
                }}
              >
                Reject
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-72">
            <p>No purchase items found for this ID.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckinPurchase;
