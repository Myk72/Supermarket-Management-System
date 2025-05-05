import React from "react";
import { useEffect, useState } from "react";
import { HomeIcon } from "lucide-react";
import { cardData } from "@/components/card/cardItem";
import Card from "@/components/card/card";
import { useProductStore } from "@/store/product.store";
import { useSaleStore } from "@/store/sales.store";
import { useCustomerStore } from "@/store/customers.store";
import { useInventoryStore } from "@/store/inventory.store";
import { useCategoryStore } from "@/store/category.store";

const Dashboard = () => {
  const { products, fetchProducts } = useProductStore();
  const { sales, fetchSales } = useSaleStore();
  const { customers, fetchCustomers } = useCustomerStore();
  const { inventory, fetchInventory } = useInventoryStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchSales();
    fetchCustomers();
    fetchInventory();
    fetchCategories();
  }, [fetchProducts, fetchSales, fetchCustomers, fetchInventory]);

  useEffect(() => {
    if (inventory.length && products.length) {
      const lowStockItems = inventory
        .filter((item) => item.quantity <= item.reorder_level)
        .map((item) => {
          const product = products.find(
            (p) => p.product_id === item.product_id
          );
          return {
            ...item,
            name: product?.name || "Unknown Product",
          };
        });
      setLowStock(lowStockItems);
    }
  }, [inventory, products]);

  const today = new Date().toISOString().split("T")[0];
  const todaySales = sales.filter(
    (sale) => new Date(sale.sale_date).toISOString().split("T")[0] === today
  );

  return (
    <div className="space-y-6">
      <div className="text-3xl">
        <h1 className="font-bold tracking-tight flex items-center gap-2">
          Welcome to the Dashboard
          <HomeIcon className="h-8 w-8 text-muted-foreground" />
        </h1>
        <span className="text-muted-foreground text-lg">
          Overview of your supermarket operations
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((item, idx) => (
          <Card
            key={idx}
            title={item.title}
            icon={item.icon}
            value={item.value}
            description={item.description}
          />
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center gap-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4 h-[450px] w-1/2">
            <div>
              <h3 className="text-2xl font-semibold font-serif">
                Recent Sales
              </h3>
              <p className="text-sm text-gray-500">
                You made {todaySales.length} sales today
              </p>
            </div>
            <div>
              {sales.length === 0 ? (
                <p className="text-sm text-gray-400">No sales data available</p>
              ) : (
                <div className="space-y-2">
                  {sales.slice(0, 5).map((sale) => (
                    <div
                      key={sale.sale_id}
                      className="flex items-center justify-between rounded-2xl p-2 border-b border-gray-100 pb-2 hover:bg-gray-100"
                    >
                      <div>
                        <p className="font-medium">Sale #{sale.sale_id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(sale.sale_date).toLocaleString()}
                        </p>
                      </div>
                      <div className="font-medium">
                        ${sale.total_amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm space-y-4 p-6 h-[450px] w-1/2">
            <div>
              <h3 className="text-2xl font-semibold font-serif">
                Low Stock Items
              </h3>
              <p className="text-sm text-gray-500">
                Items that need to be restocked
              </p>
            </div>
            <div>
              {lowStock.length === 0 ? (
                <p className="text-sm text-gray-400">No low stock items</p>
              ) : (
                <div className="space-y-2">
                  {lowStock.slice(0, 5).map((item) => (
                    <div
                      key={item.inventory_id}
                      className="flex items-center justify-between rounded-2xl p-2 border-b border-gray-100 pb-2 hover:bg-gray-100"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} in stock (min: {item.reorder_level})
                        </p>
                      </div>
                      <div className="text-red-500 font-medium">Low</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
