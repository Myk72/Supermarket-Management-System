import { Button } from "@/components/ui/button";
import {
  Eye,
  Phone,
  ShoppingCart,
  Calendar,
  Home,
  Edit,
  Trash2,
  MailIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SupplierColumns = [
  {
    id: "supplier_id",
    accessorKey: "supplier_id",
    header: "ID",
    size: 20,
    cell: ({ row }) => <div>#{row.original.supplier_id}</div>,
  },

  {
    id: "name",
    accessorKey: "name",
    header: "Supplier Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    size: 120,
  },

  {
    id: "contact",
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
    cell: ({ row }) => (
      <div className="flex items-center">
        <ShoppingCart className="size-4 mr-1 text-gray-500" />
        <span>{row.original.total_purchases || 0}</span>
      </div>
    ),
    size: 50,
  },

  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Start Date",
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
    header: "Status",
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
