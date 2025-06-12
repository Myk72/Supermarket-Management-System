import React, { useEffect } from "react";
import { InventoryDashboard } from "@/components/Inventory/InventoryCardItems";
import { CustomTable } from "@/components/table/Table";
import LowStockColumns from "@/components/columns/LowStock";
import InventoryColumns from "@/components/columns/InventoryCol";
import { useNavigate } from "react-router-dom";
import { useInventoryStore } from "@/store/inventory.store";

const Inventory = () => {
  const navigate = useNavigate();
  const { fetchInventory, inventory, fetchLowStockItems, lowStockItems } =
    useInventoryStore();
  useEffect(() => {
    fetchInventory();
    fetchLowStockItems();
  }, [fetchInventory, fetchLowStockItems]);

  return (
    <div className="flex flex-col w-full font-serif gap-4">
      <h1 className="text-2xl font-semibold text-blue-900">
        Inventory Management
      </h1>
      <InventoryDashboard />

      <div className="flex flex-row gap-2">
        <div className="w-3/5 pr-4 bg-white p-4 rounded-2xl border shadow-sm space-y-2">
          <h2 className="text-xl font-semibold">Inventory List</h2>

          <CustomTable
            columns={InventoryColumns}
            data={inventory}
            addButtonText={"Add New Inventory"}
            pageSize={5}
            onAddClick={() => {
              navigate("/inventory/add");
            }}
          />
        </div>
        <div className="w-2/5 bg-white p-4 rounded-2xl border shadow-sm space-y-2">
          <h2 className="text-xl font-semibold text-red-500">
            Low Stock Items
          </h2>

          <CustomTable
            columns={LowStockColumns}
            data={lowStockItems}
            pageSize={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
