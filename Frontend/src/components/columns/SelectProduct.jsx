import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

const SelectProductColumns = [
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
    size: 40,
    cell: ({ row }) => (
      <div className="font-mono text-xs text-gray-500">
        #{row.getValue("product_id")}
      </div>
    ),
  },

  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.original.name}</div>,
    size: 50,
  },

  {
    id: "category",
    accessorFn: (row) => row.category.name,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.original.category.name}</div>,
    size: 100,
  },

  {
    id: "cost_price",
    accessorKey: "cost_price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cost Price
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="font-medium">${row.original.cost_price}</span>
      </div>
    ),
    size: 80,
  },
];

export default SelectProductColumns;
