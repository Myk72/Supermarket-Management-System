import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useAuthStore from "@/store/auth.store";

const Sidebar = ({ header, navItems, activeNavItem }) => {
  const { role } = useAuthStore();
  return (
    <div className="w-56 flex flex-col h-screen bg-white shadow-2xl">
      <div className="flex items-center gap-2 py-3 px-2 justify-center">
        <ShoppingCart size={32} className="text-green-500" />
        <h1 className="text-lg font-bold font-serif ml-2 text-indigo-600">
          {header}
        </h1>
      </div>
      <div>
        <nav className="px-4 w-full py-6">
          <ul className="space-y-3">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeNavItem.name === item.name;

              if (!item.role.includes(role)) {
                return null;
              }

              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={`flex items-center rounded-r-lg gap-3 p-2 ${
                      isActive
                        ? "bg-gray-50 text-blue-600 border-l-4 border-blue-600 font-semibold"
                        : "hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    <IconComponent className="size-4" />
                    <span className="font-serif text-sm">{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
