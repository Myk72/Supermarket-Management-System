import React from "react";
import { useParams } from "react-router-dom";
import { useSaleStore } from "@/store/sales.store";
import { useEffect } from "react";
import { CustomTable } from "../table/Table";
import { Button } from "../ui/button";
import { ArrowBigLeft } from "lucide-react";
const ViewSale = () => {
  const { id } = useParams();
  const { fetchSaleItems, saleItems } = useSaleStore();
  useEffect(() => {
    fetchSaleItems(id);
  }, [id, fetchSaleItems]);
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
      <h1 className="text-xl font-serif text-blue-900 mb-6">
        Sale Details for Sale ID: {id}
      </h1>
      <CustomTable columns={[]} data={[]} />
    </div>
  );
};

export default ViewSale;
