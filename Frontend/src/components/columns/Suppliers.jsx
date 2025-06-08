import { Button } from "@/components/ui/button";
import { Eye, Phone, Mail, ShoppingCart, Calendar, Home, Edit, Trash2 } from "lucide-react";
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
          <span className="text-xs">{row.original.phone}</span>
        </div>
        <div className="flex items-center">
          <Mail className="size-3 mr-1 text-gray-500" />
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
    id: "last_order",
    accessorKey: "last_order",
    header: "Last Order",
    cell: ({ row }) => (
      <div className="flex items-center text-sm text-gray-600">
        <Calendar className="size-4 mr-1 text-gray-500" />
        <span>{row.original.last_order || "N/A"}</span>
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
            ${status === "Active" ? "bg-green-400" : "bg-red-500"}

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
