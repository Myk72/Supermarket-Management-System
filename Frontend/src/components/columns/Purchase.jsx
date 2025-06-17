import { Button } from "@/components/ui/button";
import {
  Eye,
  Edit,
  Trash2,
  User,
  Calendar,
  Truck,
  ArrowUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PurchaseOrderColumns = [
  {
    id: "purchase_id",
    accessorKey: "purchase_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Purchase ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 30,
    cell: ({ row }) => (
      <div className="font-medium">PO-{row.original.purchase_id}</div>
    ),
  },

  {
    id: "employee",
    accessorFn: (row) =>
      `${row.employee.firstName} ${row.employee.lastName} (${row.employee.employee_id})`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order By Employee
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <User className="size-4 mr-2 text-gray-500" />
        <div>
          <div className="text-xs text-gray-500">
            ID: {row.original.employee.employee_id}
          </div>
          <div className="text-xs text-gray-500">
            Name: {row.original.employee.firstName}{" "}
            {row.original.employee.lastName}
          </div>
        </div>
      </div>
    ),
    size: 120,
  },
  {
    id: "supplier",
    accessorKey: "supplier_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Supplier
        <ArrowUpDown className="size-4" />
      </Button>
    ),
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Expected Date
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Calendar className="size-4 mr-2 text-gray-500" />
        <span>{new Date(row.original.expected_date).toLocaleDateString()}</span>
      </div>
    ),
    size: 100,
  },

  {
    id: "total_cost",
    accessorKey: "total_cost",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Cost
        <ArrowUpDown className="size-4" />
      </Button>
    ),
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div
          className={`${
            status === "pending"
              ? " text-yellow-800"
              : status === "received"
              ? " text-green-500"
              : status === "cancelled"
              ? " text-red-500"
              : " text-gray-500"
          } `}
        >
          {status.toUpperCase()}
        </div>
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
        {/* <Button
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
        </Button> */}
      </div>
    ),
    enableSorting: false,
    size: 120,
  },
];

export default PurchaseOrderColumns;
