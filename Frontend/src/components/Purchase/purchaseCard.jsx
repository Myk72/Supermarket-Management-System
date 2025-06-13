import {
  LucideMessageCircleWarning,
  Package,
  ShoppingCart,
  Users,
  LucideBadgeDollarSign,
  Truck
} from "lucide-react";
import { usePurchaseStore } from "@/store/purchase.store";
import { useEffect } from "react";
import Card from "../card/card";

export const PurchaseCard = () => {
  const { fetchPurchases, purchases } = usePurchaseStore();
  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  const totalPurchases = purchases.length;
  const totalAmount = purchases.reduce(
    (acc, purchase) => acc + purchase.total_cost,
    0
  );

  const purchasePending = purchases.filter(
    (purchase) => purchase.status === "pending"
  ).length;

  const purchaseCompleted = purchases.filter(
    (purchase) => purchase.status === "completed"
  ).length;

  const PurchaseCard = [
    {
      title: "Total Purchases",
      icon: ShoppingCart,
      value: totalPurchases,
      description: `Total Purchase Orders`,
    },
    {
      title: "Total Amount",
      icon: LucideBadgeDollarSign,
      value: totalAmount.toFixed(2),
      description: `Total purchase value`,
    },
    {
      title: "Pending Orders",
      icon: LucideMessageCircleWarning,
      value: purchasePending,
      description: `Awaiting delivery`,
    },
    {
      title: "Completed Orders",
      icon: Truck,
      value: purchaseCompleted,
      description: `Successfully completed`,
    },
  ];

  return (
    <div className="flex flex-row gap-4">
      {PurchaseCard.map((item, index) => (
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
