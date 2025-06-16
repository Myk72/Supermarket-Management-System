import { Button } from "@/components/ui/button";
import { Edit, Trash2, Star, Percent, Eye, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Barcode from "react-barcode";
import { MdLocalOffer } from "react-icons/md";

const ProductColumns = [
  {
    id: "product_id",
    accessorKey: "product_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.category.name} Fruit
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
    id: "price",
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="size-4" />
      </Button>
    ),
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
    accessorKey: "barcode",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Barcode
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Barcode value={row.original.barcode || "N/A"} height={64} />
      </div>
    ),
    size: 150,
  },

  {
    id: "expiry_trackers",
    accessorKey: "expiry_trackers",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Expiry Trackers
        <ArrowUpDown className="size-4" />
      </Button>
    ),

    size: 20,
    cell: ({ row }) => {
      const expiryTrackers = row.original.expiry_trackers || [];
      return (
        <div className="flex flex-col space-y-1">
          {expiryTrackers.length > 0 ? (
            expiryTrackers.map((tracker, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                {new Date(tracker.expiry_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
                <Badge
                  className={`${
                    new Date(tracker.expiry_date) < new Date()
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {new Date(tracker.expiry_date) < new Date()
                    ? "Expired"
                    : "Valid"}
                </Badge>
              </div>
            ))
          ) : (
            <div className="bg-gray-300 text-gray-700">No Trackers</div>
          )}
        </div>
      );
    },
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
          <Eye className="size-4 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-100"
          onClick={() => {
            table.options.meta?.onDiscountClick(row.original);
          }}
          title="Add Discount"
        >
          <MdLocalOffer className="size-4 text-blue-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-100"
          onClick={() => {
            table.options.meta?.onDeleteClick(row.original);
          }}
          title="Delete Product"
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
