import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Sidebar = ({ header, navItems, activeNavItem }) => {
  return (
    <div className="w-64 flex flex-col h-screen bg-white border-r border-gray-300">
      <div className="flex items-center border-b border-gray-200 gap-2 py-4 px-2 justify-center">
        <ShoppingCart size={32} />
        <h1 className="text-lg font-bold font-serif ml-2">{header}</h1>
      </div>
      <div>
        <nav className="px-4 w-full py-5">
          <ul className="space-y-3">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeNavItem.name === item.name;

              return (
                <li key={item.id}>
                  <NavLink
                    to={item.href}
                    className={`flex items-center rounded-r-lg gap-3 p-2 ${
                      isActive
                        ? "bg-gray-50 text-blue-600 border-l-4 border-blue-600"
                        : "hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-serif">{item.name}</span>
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
