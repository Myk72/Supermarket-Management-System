import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useAuthStore from "@/store/auth.store";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { isAuthenticated } = useAuthStore();
  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow text-blue-900">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-10 h-10 text-blue-900" />
          <div>
            <h1 className="text-xl font-bold">SuperMarket MS</h1>
            <p className="text-sm text-gray-600 font-light">
              Your one-stop solution for supermarket management
            </p>
          </div>
        </div>
        <nav className="flex gap-6 font-semibold p-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
            onClick={() => setActiveTab("home")}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
            onClick={() => setActiveTab("about")}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
            onClick={() => setActiveTab("contact")}
          >
            Contact Us
          </NavLink>
          {!isAuthenticated && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
              onClick={() => setActiveTab("login")}
            >
              Login
            </NavLink>
          )}
        </nav>
      </header>

      <main className="bg-white grid grid-cols-2 gap-4 p-2 flex-grow">
        <div className="flex justify-center items-center shrink-0 ">
          <img
            src="/Shopping.png"
            alt="shopping Image"
            className="w-full object-cover hover:scale-105 transition-all duration-500"
          />
        </div>
        <Outlet />
      </main>

      <footer className="py-4 bg-white text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SuperMarket MS. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
