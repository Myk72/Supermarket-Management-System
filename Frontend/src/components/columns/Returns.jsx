import { Button } from "@/components/ui/button";
import { Edit, Trash2, Star, Percent, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ReturnsTableColumns = [
  {
    id: "returns_id",
    accessorKey: "returns_id",
    header: "ID",
    size: 40,
    cell: ({ row }) => <div className="font-mono text-xs text-gray-500">#</div>,
  },

  {
    id: "sales_id",
    accessorKey: "Sales ID",
    header: "Sales ID",
    cell: ({ row }) => <div className="">{row.original.sales_id}</div>,
    size: 50,
  },

  {
    id: "product_name",
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => <div className="">{row.original.product_name}</div>,
    size: 50,
  },
  {
    id: "Customer_name",
    accessorKey: "Customer_name",
    header: "Customer Name",
    cell: ({ row }) => <div className="">{row.original.product_name}</div>,
    size: 50,
  },

  {
    id: "reason",
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => <div>{row.original.reason}</div>,
    size: 100,
  },

  {
    id: "refund_amount",
    accessorKey: "refund_amount",
    header: "Refund Amount",
    cell: ({ row }) => <div>${row.original.refund_amount}</div>,
    size: 50,
  },

  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-xs">
        {new Date(row.original.created_at).toLocaleString()}
      </div>
    ),
    size: 60,
  },

  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`rounded-full items-center text-white flex justify-center p-1 w-3/4 text-xs
        ${
          row.original.status === "approved"
            ? "bg-green-500"
            : row.original.status === "pending"
            ? "bg-yellow-500"
            : "bg-red-500"
        }
        `}
      >
        {row.original.status.toUpperCase()}
      </div>
    ),
    size: 50,
  },
];

export default ReturnsTableColumns;
