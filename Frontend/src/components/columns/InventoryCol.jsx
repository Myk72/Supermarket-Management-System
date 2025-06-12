import { Button } from "@/components/ui/button";
import { Edit, Trash2, Star, Percent, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const InventoryColumns = [
  {
    id: "inventory_id",
    accessorKey: "inventory_id",
    header: "Invertory ID",
    size: 20,
  },

  {
    id: "product_id",
    accessorKey: "product_id",
    header: "Product ID",
    size: 100,
  },

  {
    id: "quantity",
    accessorKey: "quantity",
    header: "Quantity",
    size: 50,
  },
  {
    id: "reorder_level",
    accessorKey: "reorder_level",
    header: "Reorder Level",
    size: 50,
  },

  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.quantity > 0 ? "Available" : "Out of Stock";
      return (
        <Badge
          variant={status === "Available" ? "success" : "destructive"}
          className={`text-sm ${
            status === "Available"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </Badge>
      );
    },
    size: 60,
  },

  {
    id: "actions",
    header: "View",
    cell: ({ row, table }) => (
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-100"
          onClick={() => {
            table.options.meta?.onViewClick(row.original);
          }}
        >
          <Eye className="size-4 text-blue-600" />
        </Button>
      </div>
    ),
    enableSorting: false,
    size: 30,
  },
];

export default InventoryColumns;
