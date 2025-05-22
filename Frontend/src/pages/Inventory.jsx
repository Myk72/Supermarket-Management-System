import React from "react";
import { InventoryCardData } from "@/components/Inventory/InventoryCardItems";
import Card from "@/components/card/card";
import { CustomTable } from "@/components/table/Table";
import LowStockColumns from "@/components/columns/LowStock";
import InventoryColumns from "@/components/columns/InventoryCol";

const Inventory = () => {
  return (
    <div className="flex flex-col w-full font-serif gap-4">
      <h1 className="text-2xl font-bold ">Inventory Management</h1>
      <div className="flex flex-row gap-4">
        {InventoryCardData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            icon={item.icon}
            description={item.description}
            value={item.value}
          />
        ))}
      </div>
      <div className="flex flex-row gap-2">
        {/* Inventory table */}
        <div className="w-3/5 pr-4 bg-white p-4 rounded-2xl">
          <h2 className="text-xl font-semibold">Inventory List</h2>
          {/* Table component */}
          <CustomTable
            columns={InventoryColumns}
            data={[]}
            addButtonText={"Add New Inventory"}
            pageSize={5}
          />
        </div>
        <div className="w-2/5 bg-white p-4 rounded-2xl">
          <h2 className="text-xl font-semibold text-red-500">Low Stock Items</h2>
          {/* Table component */}
          <CustomTable columns={LowStockColumns} data={[]} pageSize={5} />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
