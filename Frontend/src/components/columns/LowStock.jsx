const LowStockColumns = [
  {
    id: "inventory_id",
    accessorKey: "inventory_id",
    header: "Invertory ID",
    size: 20,
  },

  {
    id: "product_id",
    accessorKey: "product_id",
    header: "Product ID",
    size: 100,
  },

  {
    id: "quantity",
    accessorKey: "quantity",
    header: "Current Quantity",
    size: 50,
  },

  {
    id: "reorder_level",
    accessorKey: "reorder_level",
    header: "Reorder Level",
    size: 50,
  },

];

export default LowStockColumns;
