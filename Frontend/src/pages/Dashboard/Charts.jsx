import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useSaleStore } from "@/store/sales.store";
import { useCustomerStore } from "@/store/customers.store";
import { useInventoryStore } from "@/store/inventory.store";

const Charts = () => {
  const {
    getMonthlySales,
    dailySales,
    getTopSellingProducts,
    topSellingProducts,
  } = useSaleStore();
  const { monthlyCustomer, getMonthlyCustomers } = useCustomerStore();
  const { getInventoryLevelsByCategory, inventoryLevelsByCategory } =
    useInventoryStore();

  useEffect(() => {
    getMonthlySales();
    getMonthlyCustomers();
    getTopSellingProducts();
  }, [getMonthlySales, getMonthlyCustomers, getTopSellingProducts]);

  useEffect(() => {
    getInventoryLevelsByCategory();
  }, [getInventoryLevelsByCategory]);

  return (
    <div className="p-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Sales Over Time 30 days</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailySales}>
            <XAxis
              dataKey="date"
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              }
            />
            <YAxis />
            <Tooltip
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              }
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topSellingProducts} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_sold" fill="#9900FF" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Inventory Levels by Category
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={inventoryLevelsByCategory}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="quantity"
              fill="#6366f1"
              barSize={30}
              name="Current Stock"
            />
            <Bar
              dataKey="reorder"
              fill="#f97316"
              barSize={30}
              name="Reorder Level"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          New Customers Over Time a Month
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyCustomer}>
            <XAxis
              dataKey={"date"}
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
            />
            <YAxis />
            <Tooltip
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-US", {
                  month: "short",
                })
              }
              formatter={(value) => value}
            />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
