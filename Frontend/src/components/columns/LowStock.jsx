import { Button } from "@/components/ui/button";
import { Edit, Trash2, Star, Percent, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LowStockColumns = [
  {
    id: "product_id",
    accessorKey: "product_id",
    header: "ID",
    size: 20,
    cell: ({ row }) => <div className="font-mono text-xs text-gray-500">#</div>,
  },

  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    size: 100,
    cell: ({ row }) => <div className="font-mono text-xs text-gray-500">#</div>,
  },

  {
    id: "quantity",
    accessorKey: "Quantity",
    header: "Current Quantity",
    cell: ({ row }) => <div>5</div>,
    size: 50,
  },

  {
    id: "reorder_level",
    accessorKey: "Reorder level",
    header: "Reorder Level",
    cell: ({ row }) => <div>10</div>,
    size: 50,
  },

];

export default LowStockColumns;
