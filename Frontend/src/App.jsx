import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import ClerkDashboard from "./pages/Dashboard/stockClerkDashboard";
import useAuthStore from "./store/auth.store";
import ViewSale from "./components/Sales/viewSale";
import AddEmployee from "./components/Employee/AddEmployee";
import AssignShift from "./components/Employee/AssignShift";
import AddSupplier from "./components/Suppliers/AddSupplier";
import AddPurchase from "./components/Purchase/AddPurchase";
import ViewPurchase from "./components/Purchase/ViewPurchase";
import AddReturns from "./components/Returns/AddReturns";
import AddProducts from "./components/product/AddProducts";
import AddInventory from "./components/Inventory/AddInventory";
import CheckinPurchase from "./components/Purchase/CheckinPurchase";
import AddCategory from "./components/Category/AddCategory";
import Home from "./pages/Landing/Home";
import ContactUs from "./pages/Landing/contactus";
import AboutUs from "./pages/Landing/AboutUs";
import LandingPage from "./pages/Landing/LandingLayout";
import ProductDiscount from "./components/product/ProductDiscount";
import ProfilePage from "./components/Profile/ProfilePage";
import Schedules from "./pages/Schedules";

const AuthRedirect = ({ children }) => {
  const { isAuthenticated, role, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(isAuthenticated, user, "in auth redirect");
    if (isAuthenticated && user) {
      if (role === "manager") {
        navigate("/dashboard");
      } else if (role === "stock") {
        navigate("/stock-clerk-dashboard");
      } else navigate("/cashier-dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  return children;
};

const App = () => {
  const { checkauth } = useAuthStore();

  useEffect(() => {
    checkauth();
  }, []);

  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Routes>
        <Route element={<LandingPage />}>
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <LoginPage />
              </AuthRedirect>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/set-password/:id"
          element={
            <AuthRedirect>
              <ResetPasswordPage />
            </AuthRedirect>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/products/view/:id" element={<ProductDetail />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/add" element={<AddProducts />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route
              element={<ProtectedRoute allowedRoles={["stock", "cashier"]} />}
            >
              <Route path="/schedule" element={<Schedules />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employee />} />
              <Route path="/employees/add" element={<AddEmployee />} />
              <Route path="/employees/assign/:id" element={<AssignShift />} />
              <Route path="/reports" element={<Report />} />
              <Route path="/suppliers/add" element={<AddSupplier />} />
              <Route path="/category/add" element={<AddCategory />} />
              <Route
                path="/products/discount/:id"
                element={<ProductDiscount />}
              />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["manager", "stock"]} />}
            >
              <Route path="/categories" element={<Category />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/add" element={<AddInventory />} />
              <Route path="/purchases" element={<Purchase />} />
              <Route path="/purchases/add" element={<AddPurchase />} />
              <Route path="/purchases/view/:id" element={<ViewPurchase />} />
              <Route path="/purchases/checkin" element={<CheckinPurchase />} />
              <Route path="/suppliers" element={<Supplier />} />

              <Route element={<ProtectedRoute allowedRoles={["stock"]} />}>
                <Route
                  path="/stock-clerk-dashboard"
                  element={<ClerkDashboard />}
                />
              </Route>
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["manager", "cashier"]} />}
            >
              <Route path="/pos" element={<ProductSale />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales/:id" element={<ViewSale />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/add" element={<AddCustomer />} />
              <Route path="/returns" element={<Return />} />
              <Route path="/returns/add" element={<AddReturns />} />

              <Route element={<ProtectedRoute allowedRoles={["cashier"]} />}>
                <Route
                  path="/cashier-dashboard"
                  element={<CashierDashboard />}
                />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
