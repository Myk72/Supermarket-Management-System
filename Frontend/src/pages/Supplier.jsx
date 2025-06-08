import Card from "@/components/card/card";
import SupplierColumns from "@/components/columns/Suppliers";
import { SupplierCard } from "@/components/Suppliers/SupplierCard";
import { CustomTable } from "@/components/table/Table";
import { useSupplierStore } from "@/store/suppliers.store";
import React, { use } from "react";
import { useEffect } from "react";

const Supplier = () => {
  const { fetchSuppliers, suppliers } = useSupplierStore();
  useEffect(() => {
    fetchSuppliers();
  }, []);
  return (
    <div className="flex flex-col w-full font-serif gap-4">
      <h1 className="text-2xl font-semibold text-blue-900">Suppliers</h1>
      <div className="flex flex-row gap-4">
        {SupplierCard.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            icon={item.icon}
            description={item.description}
            value={item.value}
          />
        ))}
      </div>
      <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Suppliers List</h2>
        <CustomTable
          columns={SupplierColumns}
          data={suppliers}
          addButtonText={"Add New Supplier"}
          pageSize={5}
        />
      </div>
    </div>
  );
};

export default Supplier;
