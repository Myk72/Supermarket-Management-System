import {
  LucideMessageCircleWarning,
  Package,
  ShoppingCart,
  Users,
  Truck,
  
} from "lucide-react";
import { LucideBadgeDollarSign } from "lucide-react";

export const PurchaseCard = [
  {
    title: "Total Purchases",
    icon: ShoppingCart,
    value: 120,
    description: `Total Purchase Orders`,
  },
  {
    title: "Total Amount",
    icon: LucideBadgeDollarSign,
    value: "$5,250",
    description: `Total purchase value`,
  },
  {
    title: "Pending Orders",
    icon: LucideMessageCircleWarning,
    value: 1,
    description: `Awaiting delivery`,
  },
  {
    title: "Completed Orders",
    icon: Truck,
    value: 1,
    description: `Successfully completed`,
  },
];
