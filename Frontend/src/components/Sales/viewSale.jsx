import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSaleStore } from "@/store/sales.store";
import { Button } from "../ui/button";
import { ArrowBigLeft } from "lucide-react";
import PagePagination from "@/components/PagePagination";

const ViewSale = () => {
  const { id } = useParams();
  const { fetchSaleItems, saleItems } = useSaleStore();
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    fetchSaleItems(id);
  }, [id, fetchSaleItems]);

  return (
    <div className="p-4 bg-white rounded-2xl">
      <Button
        variant="outline"
        className="mb-4 text-gray-600 flex flex-row items-center hover:bg-gray-100 gap-0"
        onClick={() => window.history.back()}
      >
        <ArrowBigLeft className="mr-1" />
        <span>Back</span>
      </Button>

      <h1 className="text-xl font-serif text-blue-900 mb-6">
        Sale Details for Sale ID: {id}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentItems.map((item) => (
          <div
            key={item.sale_item_id}
            className="bg-white rounded-xl p-4 shadow-md border"
          >
            <h3 className="font-medium text-gray-800 mb-2">
              Sale Item #{item.sale_item_id}
            </h3>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <p className="text-sm text-gray-500">Product ID</p>
                <p className="font-medium">{item.product_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium">{item.quantity}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">Unit Price</p>
                <p className="font-medium">${item.unit_price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subtotal</p>
                <p className="font-bold">${item.subtotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PagePagination
        Items={saleItems}
        setCurrentItems={setCurrentItems}
        itemsPerPage={12}
      />
    </div>
  );
};

export default ViewSale;
