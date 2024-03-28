import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/utils";
import { NavLink, useLocation } from "react-router-dom";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../auth/AuthContext";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const iconClass =
    "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";
  const linkClass =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group";

  const isActive = (pathname: string) => {
    return location.pathname === pathname;
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      // setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      // setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={cn(
        "absolute left-0  top-0 mt-[50px] z-9999 flex h-[calc(100vh-50px)] transition-transform -translate-x-full  flex-col overflow-y-hidden bg-gray-100 dark:bg-gray-800 duration-300 ease-linear lg:static lg:translate-x-0",
        {
          "translate-x-0 w-64": !!sidebarOpen,
          "-translate-x-full w-10 ": !sidebarOpen,
        }
      )}
    >
      <div className="flex items-center justify-between gap-2 pt-5 p-2 lg:py-6.5">
        {sidebarOpen && (
          <h3 className="mb-4  text-sm font-semibold text-gray-900 dark:text-white">
            MENU
          </h3>
        )}
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className=" flex"
        >
          {sidebarOpen ? (
            <GoSidebarExpand className="w-5 h-5 mb-4 ml-4 text-gray-900 dark:text-white " />
          ) : (
            <GoSidebarCollapse className="w-5 h-5 mb-4 ml-0 text-gray-900 dark:text-white " />
          )}
        </button>
      </div>
      <div className="">
        <SidebarItem sidebarOpen={sidebarOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
