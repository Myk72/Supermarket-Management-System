import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

const SelectSalesColumns = [
  {
    id: "sale_item_id",
    accessorKey: "sale_item_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Sale Item ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 20,
    cell: ({ row }) => (
      <div className="font-mono text-xs text-gray-500">
        #{row.getValue("sale_item_id")}
      </div>
    ),
  },

  {
    id: "product_id",
    accessorKey: "product_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        P-ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 20,
    cell: ({ row }) => (
      <div className="font-mono text-xs text-gray-500">
        #{row.getValue("product_id")}
      </div>
    ),
  },
  {
    id: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    accessorKey: "quantity",
    size: 40,
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="font-medium">{row.original.quantity}</span>
      </div>
    ),
  },

  {
    id: "unit_price",
    accessorKey: "unit_price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Unit Price
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="font-medium">${row.original.unit_price}</span>
      </div>
    ),
    size: 40,
  },

  {
    id: "subtotal",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Subtotal
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    accessorKey: "subtotal",
    size: 40,
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="font-medium">${row.original.subtotal}</span>
      </div>
    ),
  },
];

export default SelectSalesColumns;
