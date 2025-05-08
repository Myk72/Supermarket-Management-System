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

import Layout from "./components/layout/layout";
import ProductSale from "./pages/ProductSale";
const App = () => {
  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Product />} />
          <Route path="/pos" element={<ProductSale />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/purchases" element={<Purchase />} />
          <Route path="/suppliers" element={<Supplier />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/returns" element={<Return />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
