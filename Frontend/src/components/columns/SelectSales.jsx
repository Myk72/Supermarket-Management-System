const SelectSalesColumns = [
  {
    id: "sale_item_id",
    accessorKey: "sale_item_id",
    header: "Sales Item ID",
    size: 20,
    cell: ({ row }) => (
      <div className="font-mono text-xs text-gray-500">
        #{row.getValue("sale_item_id")}
      </div>
    ),
  },

  {
    id: "product_id",
    accessorKey: "product_id",
    header: "Product ID",
    size: 20,
    cell: ({ row }) => (
      <div className="font-mono text-xs text-gray-500">
        #{row.getValue("product_id")}
      </div>
    ),
  },
  {
    id: "quantity",
    header: "Quantity",
    accessorKey: "quantity",
    size: 40,
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="font-medium">{row.original.quantity}</span>
      </div>
    ),
  },

  {
    id: "unit_price",
    header: "Pricing",
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="font-medium">${row.original.unit_price}</span>
      </div>
    ),
    size: 40,
  },

  // subtotal Column
  {
    id: "subtotal",
    header: "Subtotal",
    accessorKey: "subtotal",
    size: 40,
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="font-medium">${row.original.subtotal}</span>
      </div>
    ),
  },
];

export default SelectSalesColumns;
