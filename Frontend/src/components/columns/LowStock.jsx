import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

const LowStockColumns = [
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
    accessorKey: "product",
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
        <div className="space-y-1 flex flex-col w-full">
          <span className="font-medium text-blue-900">
            {row.original.product.name}
          </span>
          <span className="text-sm text-gray-600">
            PID: {row.original.product.product_id}
          </span>
        </div>
      );
    },
    size: 100,
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
        Reorder
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    size: 50,
  },
];

export default LowStockColumns;
