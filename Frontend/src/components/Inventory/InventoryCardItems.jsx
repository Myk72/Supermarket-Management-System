import { LucideMessageCircleWarning, Package, ShoppingCart, Users } from "lucide-react";
import { LucideBadgeDollarSign } from "lucide-react";

export const InventoryCardData = [
  {
    title: "Inventory Value",
    icon: LucideBadgeDollarSign,
    value: 23463.56,
    description: `Cost Price`,
  },
  {
    title: "Total Products",
    icon: Package,
    value: 572,
    description: `Total Products`,
  },
  {
    title: "Low Stock Items",
    icon: LucideMessageCircleWarning,
    value: 165,
    description: `Items below reorder level`,
  },
  {
    title: "Out of Stock Items",
    icon: LucideMessageCircleWarning,
    value: 165,
    description: `Items with zero quantity`,
  },


];
