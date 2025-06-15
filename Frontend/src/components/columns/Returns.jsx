import { ArrowUpDown, User } from "lucide-react";
import { Button } from "../ui/button";

const ReturnsTableColumns = [
  {
    id: "return_id",
    accessorKey: "return_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Return ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 40,
  },

  {
    id: "sale_id",
    accessorKey: "sale_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Sale ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 50,
  },

  {
    id: "product_name",
    accessorKey: "product_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Product Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.original.product_id}</div>,
    size: 50,
  },

  {
    id: "return_reason",
    accessorKey: "return_reason",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Return Reason
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 100,
  },

  {
    id: "refund_amount",
    accessorKey: "refund_amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Refund Amount
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <div>${row.original.refund_amount}</div>,
    size: 50,
  },

  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className={`rounded-lg items-start  p-2
        ${
          row.original.status === "approved"
            ? "text-green-500"
            : row.original.status === "pending"
            ? "text-yellow-500"
            : "text-red-500"
        }
        `}
      >
        {row.original.status.toUpperCase()}
      </div>
    ),
    size: 20,
  },

  {
    id: "processed_by",
    accessorKey: "processed_by",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Processed By
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <User className="mr-2 size-4" />
        ID: {row.original.processed_by}
      </div>
    ),
    size: 60,
  },

  {
    id: "processed_at",
    accessorKey: "processed_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-xs">
        {new Date(row.original.processed_at).toLocaleString()}
      </div>
    ),
    size: 60,
  },
];

export default ReturnsTableColumns;
