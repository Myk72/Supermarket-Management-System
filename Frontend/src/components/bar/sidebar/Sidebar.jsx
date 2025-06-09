import { NavLink } from "react-router-dom";
import { ChevronsLeft, ChevronsRight, ShoppingCart } from "lucide-react";
import useAuthStore from "@/store/auth.store";

const Sidebar = ({
  header,
  navItems,
  activeNavItem,
  sidebarOpen,
  onToggle,
}) => {
  const { role } = useAuthStore();
  return (
    <div
      className={`flex flex-col h-screen bg-white shadow-2xl border-r border-gray-300
      ${sidebarOpen ? "w-56" : "w-18"} transition-width duration-500`}
    >
      <div className="flex items-center gap-2 py-3 px-2 justify-center border-b border-gray-300">
        <ShoppingCart size={32} className="text-[#5865F2]" />
        {sidebarOpen && (
          <h1 className="text-lg font-bold font-serif ml-2 text-indigo-600">
            {header}
          </h1>
        )}
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
                    }
                        ${sidebarOpen ? "justify-start" : "justify-center"}
                        `}
                  >
                    <IconComponent className="size-4" />
                    {sidebarOpen && (
                      <span className="font-serif text-sm">{item.name}</span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-auto border-t">
        <button
          onClick={onToggle}
          className="w-full flex items-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors justify-center"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? (
            <>
              <ChevronsLeft className="size-6" />
            </>
          ) : (
            <>
              <ChevronsRight className="size-6" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
