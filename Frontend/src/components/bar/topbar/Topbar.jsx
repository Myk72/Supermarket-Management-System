import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FiUser } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Topbar = ({ currentNavItem }) => {
  const { user, logout } = useAuthStore();
  const Navigate = useNavigate();
  console.log(currentNavItem);
  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold font-serif">{currentNavItem}</h1>
      </div>

      <div className="ml-auto flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="rounded-full flex items-center justify-center cursor-pointer border p-1">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-6 h-6 object-cover"
                />
              ) : (
                <FiUser className="w-6 h-6" />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
