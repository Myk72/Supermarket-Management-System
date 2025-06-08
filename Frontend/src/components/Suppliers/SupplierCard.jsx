import {
  LucideMessageCircleWarning,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { LucideBadgeDollarSign } from "lucide-react";

export const SupplierCard = [
  {
    title: "Total Suppliers",
    icon: Users,
    value: 45,
    description: `Registered Suppliers`,
  },
  {
    title: "Total Purchases",
    icon: ShoppingCart,
    value: 120,
    description: `Total Purchase Orders`,
  },
  {
    title: "Active Suppliers",
    icon: Package,
    value: 30,
    description: `Suppliers with recent activity`,
  },
];
