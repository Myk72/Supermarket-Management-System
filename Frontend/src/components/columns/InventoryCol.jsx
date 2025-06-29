import { Button } from "@/components/ui/button";
import { Edit, Trash2, User, Eye, Package2, ArrowUpDown } from "lucide-react";

const InventoryColumns = [
  {
    id: "inventory_id",
    accessorKey: "inventory_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={"text-xs"}
      >
        ID
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    size: 20,
  },

  {
    id: "product",
    accessorFn: (row) => `${row.product.name} (${row.product.product_id})`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={"text-xs"}
      >
        Product
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Package2 size={18} className="text-sky-900 w-1/4" />
          <div className="grid grid-cols-1 w-full">
            <span className="font-medium text-blue-900">
              {row.original.product?.name}
            </span>
            <span className="text-sm text-gray-600">
              ID: {row.original.product?.product_id}
            </span>
          </div>
        </div>
      );
    },
    size: 50,
  },

  {
    id: "quantity",
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={"text-xs"}
      >
        Quantity
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    size: 50,
  },
  {
    id: "reorder_level",
    accessorKey: "reorder_level",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={"text-xs"}
      >
        Reorder Level
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    size: 50,
  },

  {
    id: "location",
    accessorKey: "location",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={"text-xs"}
      >
        Location
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-700">
          {row.original.location || "Not Specified"}
        </div>
      );
    },
    size: 80,
  },

  {
    id: "last_restocked",
    accessorKey: "last_restocked",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={"text-xs"}
      >
        Last Restocked
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.last_restocked);
      return (
        <div className="text-sm text-gray-600">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
    size: 50,
  },
];

export default InventoryColumns;
