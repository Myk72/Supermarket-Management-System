import {
  BarChart3,
  Box,
  Home,
  LogOut,
  Package,
  ShoppingCart,
  Tag,
  Truck,
  Users,
  UserCog,
  Warehouse,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";

export const navigation = [
  { name: "Dashboard", href: "dashboard", icon: Home },
  { name: "POS", href: "pos", icon: ShoppingBag },
  { name: "Products", href: "products", icon: Package },
  { name: "Sales", href: "sales", icon: ShoppingCart },
  { name: "Inventory", href: "inventory", icon: Box },
  { name: "Customers", href: "customers", icon: Users },
  { name: "Purchases", href: "purchases", icon: Warehouse },
  { name: "Suppliers", href: "suppliers", icon: Truck },
  { name: "Employees", href: "employees", icon: UserCog },
  { name: "Reports", href: "reports", icon: BarChart3 },
  { name: "Returns", href: "returns", icon: RefreshCw },
];
