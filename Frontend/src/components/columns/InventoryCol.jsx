import { Button } from "@/components/ui/button";
import { Edit, Trash2, Star, Percent, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const InventoryColumns = [
  {
    id: "inventory_id",
    accessorKey: "inventory_id",
    header: "ID",
    size: 20,
    cell: ({ row }) => <div className="font-mono text-xs text-gray-500">#</div>,
  },

  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className=""></div>,
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
    id: "reorder_level",
    accessorKey: "Reorder Level",
    header: "Reorder Level",
    cell: ({ row }) => <div>10</div>,
    size: 50,
  },

  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div></div>,
    size: 60,
  },

  {
    id: "pricing",
    header: "Pricing",
    cell: ({ row }) => <div></div>,
    size: 80,
  },

  {
    id: "actions",
    header: "View",
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
          <Eye className="size-4 text-blue-600" />
        </Button>
      </div>
    ),
    enableSorting: false,
    size: 30,
  },
];

export default InventoryColumns;
