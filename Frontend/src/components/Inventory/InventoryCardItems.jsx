import {
  LucideMessageCircleWarning,
  Package,
  ShoppingCart,
  Users,
  LucideBadgeDollarSign,
} from "lucide-react";
import { useInventoryStore } from "@/store/inventory.store";
import { useEffect } from "react";
import Card from "../card/card";
import { useProductStore } from "@/store/product.store";

export const InventoryDashboard = () => {
  const {
    fetchInventoryProduct,
    inventoryProduct,
    fetchLowStockItems,
    lowStockItems,
  } = useInventoryStore();

  useEffect(() => {
    fetchInventoryProduct();
    fetchLowStockItems();
  }, [fetchInventoryProduct, fetchLowStockItems]);

  const lowItemsCount = lowStockItems.length;
  const outOfStockCount = inventoryProduct.filter(
    (item) => item.quantity === 0
  ).length;
  const totalProducts = inventoryProduct.length;

  const totalInventoryValue = inventoryProduct.reduce(
    (acc, item) => acc + item.quantity * item.product.cost_price,
    0
  );

  const InventoryCardData = [
    {
      title: "Inventory Value",
      icon: LucideBadgeDollarSign,
      value: totalInventoryValue,
      description: `Cost Price`,
    },
    {
      title: "Total Products",
      icon: Package,
      value: totalProducts,
      description: `Total Products`,
    },
    {
      title: "Low Stock Items",
      icon: LucideMessageCircleWarning,
      value: lowItemsCount,
      description: `Items below reorder level`,
    },
    {
      title: "Out of Stock Items",
      icon: LucideMessageCircleWarning,
      value: outOfStockCount,
      description: `Items with zero quantity`,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
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
  );
};
