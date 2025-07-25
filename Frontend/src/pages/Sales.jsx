import React, { useEffect, useState } from "react";
import { useSaleStore } from "@/store/sales.store";
import SalesCard from "@/components/Sales/salesCard";
import PagePagination from "@/components/PagePagination";

const Sales = () => {
  const { sales, fetchSales } = useSaleStore();
  useEffect(() => {
    fetchSales();
  }, []);

  const [currentItems, setCurrentItems] = useState([]);
  return (
    <div className="font-serif flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-blue-900">Sales List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems?.map((sale) => (
          <SalesCard key={sale.sale_id} sale={sale} />
        ))}
      </div>
      <div className="mt-auto">
        <PagePagination
          Items={sales}
          setCurrentItems={setCurrentItems}
          itemsPerPage={6}
        />
      </div>
    </div>
  );
};

export default Sales;
