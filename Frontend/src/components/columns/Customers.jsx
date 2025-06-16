import { Button } from "@/components/ui/button";
import { Edit, ArrowUpDown, Trash2 } from "lucide-react";

const CustomerColumns = [
  {
    id: "Customer id",
    accessorKey: "customer_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },

  {
    id: "Name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },

  {
    id: "Email",
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },
  {
    id: "Loyalty points",
    accessorKey: "loyalty_points",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Loyalty Points
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 20,
  },
  {
    id: "Phone",
    accessorKey: "phone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },

  // dateOfBirth
  {
    id: "Date of Birth",
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date of Birth
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.dateOfBirth);
      return (
        <div className="text-sm text-gray-700">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      );
    },
    size: 24,
  },


  // {
  //   id: "actions",
  //   header: "Quick Action",
  //   cell: ({ row, table }) => (
  //     <div className="flex space-x-2">
  //       <Button variant="ghost" size="sm" className="hover:bg-gray-200">
  //         <Edit className="size-4 text-blue-600" />
  //       </Button>
  //       <Button variant="ghost" size="sm" className="hover:bg-gray-200">
  //         <Trash2 className="size-4 text-red-600" />
  //       </Button>
  //     </div>
  //   ),
  //   enableSorting: false,
  //   size: 140,
  // },
];

export default CustomerColumns;
