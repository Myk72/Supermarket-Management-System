const SelectProductColumns = [
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
    id: "category",
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div className="">{row.original.category_id} Fruit</div>,
    size: 100,
  },

  {
    id: "cost_price",
    header: "Pricing",
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="font-medium">${row.original.cost_price}</span>
      </div>
    ),
    size: 80,
  },
];

export default SelectProductColumns;
