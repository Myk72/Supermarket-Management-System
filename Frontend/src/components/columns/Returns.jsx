import { User } from "lucide-react";

const ReturnsTableColumns = [
  {
    id: "return_id",
    accessorKey: "return_id",
    header: "ID",
    size: 40,
  },

  {
    id: "sale_id",
    accessorKey: "sale_id",
    header: "Sales ID",
    size: 50,
  },

  {
    id: "product_name",
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => <div className="">{row.original.product_id}</div>,
    size: 50,
  },

  {
    id: "return_reason",
    accessorKey: "return_reason",
    header: "Reason",
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
    id: "status",
    accessorKey: "status",
    header: "Status",
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
    header: "Processed By",
    cell: ({ row }) => (
      <div className="flex items-center">
        <User className="mr-2 size-4" />
        ID: {row.original.processed_by}
      </div>
    ),
    size: 60,
  },

  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-xs">
        {new Date(row.original.processed_at).toLocaleString()}
      </div>
    ),
    size: 60,
  },
];

export default ReturnsTableColumns;
