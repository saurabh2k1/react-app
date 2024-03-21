import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/utils";
import { NavLink } from "react-router-dom";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { MdDashboard } from "react-icons/md";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const iconClass = "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";
  const linkClass = "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group";
  const storeSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storeSidebarExpanded === null ? false : storeSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={cn(
        "absolute left-0 top-0 mt-[80px] z-9999 flex h-screen  flex-col overflow-y-hidden bg-gray-100 dark:bg-gray-800 duration-300 ease-linear lg:static lg:translate-x-0",
        {
          "translate-x-0 w-64": !!sidebarOpen,
          "-translate-x-full w-10 ": !sidebarOpen,

        }
      )}
    >
      <div className="flex items-center justify-between gap-2 pt-5 pl-2 pr-6 py-5.5 lg:py-6.5">
        { sidebarOpen && <h3 className="mb-4  text-sm font-semibold text-gray-900 dark:text-white">
          MENU
        </h3> }
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className=" flex"
        >
           { sidebarOpen? (
           
            <GoSidebarExpand className="mb-4 ml-4 text-gray-900 dark:text-white " />) : (
                <GoSidebarCollapse className="mb-4 ml-0 text-gray-900 dark:text-white "  />
            ) }
        </button>
      </div>
      <div className="" >
        <ul className="space-y-2 font-medium">
            <li>
            <a
                href="/"
                className={linkClass}
            >
                <MdDashboard className={iconClass} />
                <span className="ms-3">Dashboard</span>
            </a>
            </li>
        </ul>
      </div>
     
    </aside>
  );
};

export default Sidebar;
