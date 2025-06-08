import Sidebar from "../bar/sidebar/Sidebar";
import Topbar from "../bar/topbar/Topbar";
import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import { navigation as NavItems } from "../NavItems";
const Layout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const activeNavItem =
    NavItems.find((item) => {
      return item.href === location.pathname.split("/")[1];
    }) || NavItems[0];


  return (
    <div className="flex w-full h-screen">
      <Sidebar
        header={"SuperMarket"}
        navItems={NavItems}
        activeNavItem={activeNavItem}
        sidebarOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-col flex-1">
        <Topbar currentNavItem={activeNavItem.name} />

        <main className="p-6 bg-gray-100 h-screen overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
