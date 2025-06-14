import {
  LucideMessageCircleWarning,
  Package,
  ShoppingCart,
  Users,
  LucideBadgeDollarSign,
} from "lucide-react";
import { useSupplierStore } from "@/store/suppliers.store";
import { useEffect } from "react";
import Card from "../card/card";

export const SupplierCard = () => {
  const { fetchSuppliers, suppliers } = useSupplierStore();
  useEffect(() => {
    fetchSuppliers();
    console.log(suppliers)
  }, [fetchSuppliers]);

  const totalSuppliers = suppliers.length;
  const totalPurchases  = suppliers.reduce(
    (acc, supplier) => acc + (supplier.purchases ? supplier.purchases.length : 0),
    0
  );
  const activeSuppliers = suppliers.filter(
    (supplier) => supplier.status === "active"
  ).length;

  const SupplierCard = [
    {
      title: "Total Suppliers",
      icon: Users,
      value: totalSuppliers,
      description: `Registered Suppliers`,
    },
    {
      title: "Total Purchases",
      icon: ShoppingCart,
      value: totalPurchases,
      description: `Total Purchase Orders`,
    },
    {
      title: "Active Suppliers",
      icon: Package,
      value: activeSuppliers,
      description: `Suppliers with recent activity`,
    },
  ];

  return (
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
  );
};
