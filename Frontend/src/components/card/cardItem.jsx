import { Package, ShoppingCart, Users } from "lucide-react";
import { LucideBadgeDollarSign } from "lucide-react";

export const cardData = [
  {
    title: "Total Sales",
    icon: LucideBadgeDollarSign,
    value: 23463.56,
    description: `+${1263}% from today`,
  },
  {
    title: "Products",
    icon: Package,
    value: 572,
    description: `${24} items low in stock`,
  },
  {
    title: "Sales Today",
    icon: ShoppingCart,
    value: 165,
    description: `$${679} total value`,
  },
  {
    title: "Customers",
    icon: Users,
    value: 78,
    description: `${63} new today`,
  },
];
