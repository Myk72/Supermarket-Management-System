import { Button } from "./components/ui/button";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Product from "./pages/Product";
import Return from "./pages/Return";
import Supplier from "./pages/Supplier";
import Customers from "./pages/Customers";
import Employee from "./pages/Employee";
import Purchase from "./pages/Purchase";
import Sales from "./pages/Sales";
import Category from "./pages/Category";
import Inventory from "./pages/Inventory";
import Report from "./pages/Report";
import ProductDetail from "./components/product/productDetail";
import AddCustomer from "./components/Customers/AddCustomer";

import Layout from "./components/layout/layout";
import ProductSale from "./pages/ProductSale";
import Unauthorized from "./components/Auth/Unauthorized";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import CashierDashboard from "./pages/Dashboard/CashierDashboard";
import ResetPasswordPage from "./pages/Auth/ResetPassword";
const App = () => {
  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/set-password/:id" element={<ResetPasswordPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/products/view/:id" element={<ProductDetail />} />
            <Route path="/products" element={<Product />} />

            <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employee />} />
              <Route path="/reports" element={<Report />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["manager", "stocker"]} />}
            >
              <Route path="/categories" element={<Category />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/purchases" element={<Purchase />} />
              <Route path="/suppliers" element={<Supplier />} />
              <Route path="/returns" element={<Return />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["manager", "cashier"]} />}
            >
              <Route path="/pos" element={<ProductSale />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/add" element={<AddCustomer />} />

              <Route element={<ProtectedRoute allowedRoles={["cashier"]} />}>
                <Route
                  path="/cashier-dashboard"
                  element={<CashierDashboard />}
                />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
