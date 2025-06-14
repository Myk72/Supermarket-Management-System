import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, User, Calendar, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PurchaseOrderColumns = [
  {
    id: "purchase_id",
    accessorKey: "purchase_id",
    header: "Purchase ID",
    size: 30,
    cell: ({ row }) => (
      <div className="font-medium">PO-{row.original.purchase_id}</div>
    ),
  },
  {
    id: "employee",
    header: "Ordered By",
    cell: ({ row }) => (
      <div className="flex items-center">
        <User className="size-4 mr-2 text-gray-500" />
        <div>
          <div className="text-xs text-gray-500">
            ID: {row.original.employee_id}
          </div>
        </div>
      </div>
    ),
    size: 120,
  },
  {
    id: "supplier",
    accessorKey: "supplier_name",
    header: "Supplier",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Truck className="size-4 mr-2 text-gray-500" />
        <span>{row.original.supplier.name}</span>
      </div>
    ),
    size: 120,
  },
  {
    id: "expected_date",
    accessorKey: "expected_date",
    header: "Expected Date",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Calendar className="size-4 mr-2 text-gray-500" />
        <span>{new Date(row.original.expected_date).toLocaleDateString()}</span>
      </div>
    ),
    size: 100,
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-medium">
        ${parseFloat(row.original.total_cost).toFixed(2)}
      </div>
    ),
    size: 80,
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variantMap = {
        received: "default",
        pending: "secondary",
        Cancelled: "destructive",
      };
      return (
        <Badge variant={variantMap[status] || "default"} className="text-xs">
          {status}
        </Badge>
      );
    },
    size: 100,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => (
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          onClick={() => table.options.meta?.onViewClick(row.original)}
        >
          <Eye className="size-4 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => table.options.meta?.onEditClick(row.original)}
        >
          <Edit className="size-4 text-blue-600" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => table.options.meta?.onDeleteClick(row.original)}
        >
          <Trash2 className="size-4 text-red-600" />
        </Button>
      </div>
    ),
    enableSorting: false,
    size: 120,
  },
];

export default PurchaseOrderColumns;
