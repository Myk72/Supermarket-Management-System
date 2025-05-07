import Sidebar from "../bar/sidebar/Sidebar";
import Topbar from "../bar/topbar/Topbar";
import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { navigation as NavItems } from "../NavItems";
const Layout = () => {
  const location = useLocation();

  const activeNavItem =
    NavItems.find((item) => item.href === location.pathname) || NavItems[0];

// console.log(activeNavItem, NavItems[0].name,"here")

  return (
    <div className="flex w-full h-screen">
      <Sidebar
        header={"SuperMarket MS"}
        navItems={NavItems}
        activeNavItem={activeNavItem}
      />

      <div className="flex flex-col flex-1 border-gray-200">
        <Topbar currentNavItem={activeNavItem.name} />

        <main className="p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
