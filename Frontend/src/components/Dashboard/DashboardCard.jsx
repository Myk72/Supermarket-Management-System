import React from "react";
import {
  Package,
  ShoppingCart,
  Users,
  LucideBadgeDollarSign,
} from "lucide-react";
import Card from "../card/card";

const DashboardCard = ({ products, sales, customers, inventory, lowStock }) => {
  const lowStockCount = lowStock.length;
  const productsCount = products.length;
  const customersCount = customers.length;
  const todaySales = sales.filter(
    (sale) =>
      new Date(sale.sale_date).toISOString().split("T")[0] ===
      new Date().toISOString().split("T")[0]
  );

  const todaySalesValue = todaySales.reduce(
    (total, sale) => total + sale.total_amount,
    0
  );

  const todaysCustomers = customers.filter((customer) => {
    const today = new Date().toISOString().split("T")[0];
    return new Date(customer.created_at).toISOString().split("T")[0] === today;
  });

  const totalSalesValue = sales.reduce(
    (total, sale) => total + sale.total_amount,
    0
  );

  const totalSalesValuesThisMonth = sales.reduce((total, sale) => {
    const saleDate = new Date(sale.sale_date);
    const currentMonth = new Date().getMonth();
    if (saleDate.getMonth() === currentMonth) {
      return total + sale.total_amount;
    }
    return total;
  }, 0);

  const cardData = [
    {
      title: "Total Sales",
      icon: LucideBadgeDollarSign,
      value: `$${totalSalesValue.toFixed(2)}`,
      description: `$${totalSalesValuesThisMonth.toFixed(2)} this month`,
    },
    {
      title: "Products",
      icon: Package,
      value: productsCount,
      description: `${lowStockCount} items low in stock`,
    },
    {
      title: "Sales Today",
      icon: ShoppingCart,
      value: todaySales.length,
      description: `$${todaySalesValue} total value`,
    },
    {
      title: "Customers",
      icon: Users,
      value: customersCount,
      description: `${todaysCustomers.length} new today`,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cardData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          icon={item.icon}
          description={item.description}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default DashboardCard;
