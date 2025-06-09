import { Button } from "@/components/ui/button";
import { Edit, Trash2, Star, Percent, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Barcode from "react-barcode";

const ProductColumns = [
  {
    id: "product_id",
    accessorKey: "product_id",
    header: "ID",
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
    header: "Name",
    cell: ({ row }) => <div className="">{row.original.name}</div>,
    size: 50,
  },

  {
    id: "image",
    accessorKey: "image",
    header: "Picture",
    cell: ({ row }) => (
      <div className="flex space-x-3 shrink-0 overflow-hidden rounded-lg">
        <img
          src={row.original.image}
          className="object-cover hover:scale-105 transition-all duration-500 w-full h-24"
        />
      </div>
    ),
    size: 120,
  },

  {
    id: "category",
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div className="">{row.original.category_id} Fruit</div>,
    size: 100,
  },

  {
    id: "quantity",
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>10</div>,
    size: 50,
  },

  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`rounded-full items-center text-white flex justify-center p-1 w-3/4 text-xs
        ${row.original.status === "active" ? "bg-green-500" : "bg-red-500"}
        `}
      >
        {row.original.status.toUpperCase()}
      </div>
    ),
    size: 100,
  },

  {
    id: "pricing",
    header: "Pricing",
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="flex items-center">
          <span className="font-medium">${row.original.price}</span>
        </div>
        {row.original.discount > 0 && (
          <div className="text-green-500 rounded-2xl text-xs w-3/4">
            % {row.original.discount} OFF
          </div>
        )}
      </div>
    ),
    size: 80,
  },

  {
    id: "barcode",
    header: "Barcode",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Barcode
          value={row.original.barcode || "N/A"}
          height={64}
        />
      </div>
    ),
    size: 150,
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

export default ProductColumns;
