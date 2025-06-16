import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePurchaseStore } from "@/store/purchase.store";
import {
  ArrowBigLeft,
  Box,
  ClipboardList,
  DollarSign,
  Package,
} from "lucide-react";
import { Button } from "../ui/button";
const ViewPurchase = () => {
  const { id } = useParams();
  const { purchaseItems, fetchPurchaseItems } = usePurchaseStore();
  useEffect(() => {
    fetchPurchaseItems(id);
  }, [id, fetchPurchaseItems]);

  return (
    <div>
      <Button
        variant="outline"
        className="mb-4 text-gray-600 flex flex-row items-center hover:bg-gray-100 gap-0"
        onClick={() => window.history.back()}
      >
        <ArrowBigLeft className="mr-1" />
        <span>Back</span>
      </Button>
      <div>
        <h1 className="text-xl font-serif text-blue-900 mb-6">
          Purchase Details for Purchase ID: {id}
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 font-serif">
          {purchaseItems.map((item) => (
            <div
              key={item.purchase_item_id}
              className="border rounded-lg bg-white px-4 py-2"
            >
              <div className="text-indigo-600 my-2 font-serif font-semibold">
                PIO #{item.purchase_item_id}
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-blue-500" />
                  <span>
                    Product ID:{" "}
                    <span className="font-medium">{item.product_id}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <Box className="h-4 w-4 mr-2 text-blue-500" />
                  <span>
                    Quantity:{" "}
                    <span className="font-medium">{item.quantity}</span>
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
                  <span>
                    Unit Price:{" "}
                    <span className="font-medium">
                      ${item.cost_price.toFixed(2)}
                    </span>
                  </span>
                </div>
                <div className="flex items-center text-sm pt-2 border-t mt-2">
                  <ClipboardList className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="font-medium">
                    Total: ${(item.quantity * item.cost_price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPurchase;
