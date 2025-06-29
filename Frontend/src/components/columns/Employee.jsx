import { Button } from "@/components/ui/button";
import { Edit, ArrowUpDown, Trash2, UserCheck2 } from "lucide-react";

const EmployeeColumns = [
  {
    id: "Employee id",
    accessorKey: "employee_id",
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
        Full Name
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
    size: 50,
  },

  {
    id: "Role",
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
  },
  {
    id: "Salary",
    accessorKey: "salary",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Salary
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => `${row.original.salary} $`,
    size: 24,
  },
  {
    id: "Hired date",
    accessorKey: "hire_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Hired
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    size: 24,
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
  {
    id: "actions",
    header: "Quick Action",
    cell: ({ row, table }) => (
      <div className="flex space-x-2">
        <Button variant="ghost" size="sm" className="hover:bg-gray-200">
          <Edit className="size-4 text-blue-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            table.options.meta?.onAssignClick?.(row.original);
          }}
        >
          <UserCheck2 className="size-4" />
        </Button>
        {/* <Button
          variant="ghost"
          size="sm"
          className="hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            table.options.meta?.onDeleteClick?.(row.original);
          }}
        >
          <Trash2 className="size-4 text-red-600" />
        </Button> */}
      </div>
    ),
    enableSorting: false,
    size: 140,
  },
];

export default EmployeeColumns;
