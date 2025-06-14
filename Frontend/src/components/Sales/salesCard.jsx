import React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const SalesCard = ({ sale }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg border p-4 border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-green-600">
            Sale #{sale.sale_id}
          </h3>
          <p className="text-sm text-gray-500">
            {sale.customer_id
              ? `Customer: ${sale.customer_id}`
              : "Walk-in Customer"}
          </p>
          <p className="text-sm text-gray-500">
            Employee ID: {sale.employee_id}
          </p>
        </div>
        <span className="p-2 text-xs rounded-lg bg-blue-100 text-blue-800">
          {sale.payment_method.replace("_", " ").toUpperCase()}
        </span>
      </div>

      <div className="flex space-x-1 items-center mt-4">
        <CalendarIcon className="w-5 h-5 text-blue-500" />
        <p className="text-sm">Date:-</p>
        <p className="text-sm text-gray-600">
          {new Date(sale.sale_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          at{" "}
          {new Date(sale.sale_date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div className="border my-3 border-gray-200"></div>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span>{formatCurrency(sale.total_amount - sale.tax_amount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Tax</span>
          <span>{formatCurrency(sale.tax_amount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Discount</span>
          <span>{formatCurrency(sale.discount_amount)}</span>
        </div>
        <div className="border my-3 border-gray-200"></div>
        <div className="flex justify-between">
          <span className="text-sm font-semibold text-gray-700">Total</span>
          <span className="font-bold text-lg">
            {formatCurrency(
              sale.total_amount
            )}
          </span>
        </div>
      </div>
      <Button
        className={
          "bg-blue-600 hover:bg-blue-700 text-white w-full mt-2 cursor-pointer"
        }
        onClick={() => navigate(`/sales/${sale.sale_id}`)}
      >
        View Details
      </Button>
    </div>
  );
};

export default SalesCard;
