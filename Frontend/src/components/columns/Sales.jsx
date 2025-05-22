import { Button } from "@/components/ui/button";
import { Edit, Trash2, Star, Percent, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SalesColumns = [
  {
    id: "sale_id",
    accessorKey: "sale_id",
    header: "ID",
    size: 40,
    cell: ({ row }) => (
      <div className="font-mono text-xs text-gray-500">
        #{row.getValue("sale_id")}
      </div>
    ),
  },

  {
    id: "employee_id",
    accessorKey: "employee_id",
    header: "Employee ID",
    size: 40,
    cell: ({ row }) => (
      <div className="font-mono text-xs text-gray-500">
        #{row.getValue("employee_id")}
      </div>
    ),
  },

  {
    id: "total_amount",
    accessorKey: "Total amount",
    header: "Total amount",
    size: 40,
    cell: ({ row }) => (
      <div className="font-mono text-xs text-gray-500">
        {row.original.total_amount} $
      </div>
    ),
  },
  {
    id: "payment_method",
    accessorKey: "Payment Method",
    header: "Payment Method",
    size: 40,
    cell: ({ row }) => (
      <div className="font-mono text-xs text-gray-500">
        {row.original.payment_method}
      </div>
    ),
  },
  {
    id: "sale_date",
    accessorKey: "Sale Date",
    header: "Sale Date",
    size: 40,
    cell: ({ row }) => (
      <div className="font-mono text-xs text-gray-500">
        {new Date(row.original.sale_date).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    ),
  },

  {
    id: "actions",
    header: "Quick Action",
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
          <Eye className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-100"
          onClick={() => {
            table.options.meta?.onEditClick(row.original);
          }}
        >
          <Edit className="size-4 text-blue-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-100"
          onClick={() => {
            table.options.meta?.onDeleteClick(row.original);
          }}
        >
          <Trash2 className="size-4 text-red-600" />
        </Button>
      </div>
    ),
    enableSorting: false,
    size: 100,
  },
];

export default SalesColumns;
