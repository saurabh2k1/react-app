import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../utils/utils";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import { MdDashboard } from "react-icons/md";

interface SidebarUtemProps {
    sidebarOpen?: boolean;
}

const SidebarItem: React.FC<SidebarUtemProps> = ({sidebarOpen = true}) => {

    const location = useLocation();

    const isActive = (pathname: string) => {
        return location.pathname === pathname;
      };

    const linkClass =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group";
    const iconClass =
    "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";
    return (
        <ul className="space-y-2 font-medium">
            <li>
            <NavLink
                to="/"
                className={ cn(linkClass, {'bg-gray-200 dark:bg-gray-700': isActive("/")})
                  }
            >
                <MdDashboard className={iconClass} />
                { sidebarOpen && <span className="ms-3">Dashboard</span> }
            </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={cn(linkClass, {'bg-gray-200 dark:bg-gray-700': isActive('/profile')})
                }>
              <UserMinusIcon className={iconClass} />
              { sidebarOpen && <span className="ms-3">Users</span> }
              </NavLink>
            </li>
        </ul>
    );
}

export default SidebarItem;