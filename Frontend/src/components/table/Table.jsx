import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useAuthStore } from "@/store/auth.store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableToolbar } from "./TableToolbar";
import { TablePagination } from "./TablePagination";

export const CustomTable = ({
  data = [],
  columns = [],
  defaultSort = [],
  pageSize = 10,
  addButtonText,
  EnableSelection = false,
  onAddClick = () => {},
  onSelectionChange = () => {},
  meta = {},
}) => {
  const [sorting, setSorting] = useState(defaultSort);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);

  const tableColumns = EnableSelection
    ? [
        {
          id: "select",
          header: "Select",
          cell: ({ row }) => (
            <input
            type="radio"
            checked={selectedRowId === row.id}
            onChange={() => {
              setSelectedRowId(row.id);
              onSelectionChange(row.original);
            }}
            onClick={(e) => e.stopPropagation()}
            className="size-4"
            />
          ),
          size: 40,
        },
        ...columns,
      ]
    : columns;

  const table = useReactTable({
    data,
    columns: tableColumns,
    meta,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });
  const { user } = useAuthStore();

  return (
    <div className="space-y-4">
      <TableToolbar
        table={table}
        addButtonText={addButtonText}
        onAddClick={onAddClick}
        role={user?.role}
      />

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize(),
                    }}
                    className="py-2 text-gray-700 font-medium"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50"
                  onClick={() => {
                    if (EnableSelection) {
                      setSelectedRowId(row.id);
                      onSelectionChange(row.original);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`py-2 pl-4 truncate max-w-32 font-serif`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center"
                >
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination table={table} />
    </div>
  );
};
