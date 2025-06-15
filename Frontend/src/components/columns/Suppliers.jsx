import { Button } from "@/components/ui/button";
import {
  Eye,
  Phone,
  ShoppingCart,
  Calendar,
  Home,
  Edit,
  Trash2,
  MailIcon,
  ClockFading,
  TruckElectric,
  ClockAlert,
  ArrowUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SupplierColumns = [
  {
    id: "supplier_id",
    accessorKey: "supplier_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        S-ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 20,
    cell: ({ row }) => <div>#{row.original.supplier_id}</div>,
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
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    size: 120,
  },

  {
    id: "contact",
    accessorFn: (row) => `${row.contact_phone} ${row.email} ${row.address}`,
    header: "Contact Info",
    cell: ({ row }) => (
      <div className="flex flex-col space-y-1">
        <div className="flex items-center">
          <Phone className="size-3 mr-1 text-gray-500" />
          <span className="text-xs">{row.original.contact_phone}</span>
        </div>
        <div className="flex items-center">
          <MailIcon className="size-3 mr-1 text-gray-500" />
          <span className="text-xs">{row.original.email}</span>
        </div>
        <div className="flex items-center">
          <Home className="size-3 mr-1 text-gray-500" />
          <span className="text-xs">{row.original.address}</span>
        </div>
      </div>
    ),
    size: 150,
  },

  {
    id: "total_purchases",
    accessorKey: "total_purchases",
    header: "Total Purchases",
    cell: ({ row }) => {
      const purchases = row.original.purchases || [];

      const pendingCount = purchases.filter(
        (p) => p.status === "pending"
      ).length;
      const receivedCount = purchases.filter(
        (p) => p.status === "received"
      ).length;

      if (purchases.length === 0) {
        return (
          <div className="flex items-center space-x-2">
            <ShoppingCart className="size-4 text-gray-500" />
            <span className="text-xs text-gray-500">0</span>
          </div>
        );
      }

      return (
        <div className="space-y-1">
          {receivedCount > 0 && (
            <div className="flex items-center space-x-1">
              <Truck size={16} />
              <span>{receivedCount}</span>
            </div>
          )}
          {pendingCount > 0 && (
            <div className="flex items-center space-x-1">
              <ClockFading size={16} />
              <span>{pendingCount}</span>
            </div>
          )}
        </div>
      );
    },
    size: 120,
  },

  {
    id: "created_at",
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Start Date
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center text-sm text-gray-600">
        <Calendar className="size-4 mr-1 text-gray-500" />
        <span>
          Since {new Date(row.original.created_at).toLocaleDateString()}
        </span>
      </div>
    ),
    size: 100,
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
        <Badge
          variant={"outline"}
          className={`
            text-xs text-white p-2
            ${status === "active" ? "bg-green-400" : "bg-red-500"}

            `}
        >
          {status}
        </Badge>
      );
    },
    size: 80,
  },

  {
    id: "actions",
    header: "Actions",
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
          <Eye className="size-4 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-green-100"
          onClick={() => {
            table.options.meta?.onEditClick(row.original);
          }}
        >
          <Edit className="size-4 text-blue-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-green-100"
          onClick={() => {
            table.options.meta?.onEditClick(row.original);
          }}
        >
          <Trash2 className="size-4 text-red-600" />
        </Button>
      </div>
    ),
    enableSorting: false,
    size: 80,
  },
];

export default SupplierColumns;
