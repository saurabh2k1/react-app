import React, { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { BiLogIn } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { Dialog } from "@headlessui/react";
import { useAuth } from "../auth/AuthContext";
import DropdownUser from "./DropdownUser";


import UserMenu from "./core/UserMenu";

import SidebarItem from "./SidebarItem";
import NotificationBadge from "./NotificationBadge";

const AppNavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userName, isLoggedIn } = useAuth();


  return (
    <header className="absolute inset-x-0 top-0 z-50 shadow bg-gray-50 dark:bg-gray-800 bg-opacity-50 backdrop-blur-lg backdrop-filter dark:border dark:border-gray-100/10 dark:bg-boxdark-2">
      <nav
        className="flex items-center justify-between p-2 lg:px-8 dark:text-gray-50"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img
              className="h-8 w-8"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="My SaaS App"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <HiBars3 className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/* <div className="hidden lg:flex lg:gap-x-12">
                    Menu
                </div> */}
        <div className="hidden lg:flex lg:flex-1 gap-3 justify-end items-center">
          <ul className="flex justify-center items-center gap-2 sm:gap-4">
            <DarkModeSwitcher />
            <NotificationBadge count={1} />
          </ul>
          {!userName ? (
            <a href="/login" className="text-sm font-semibold leading-6 ml-4">
              <div className="flex items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white">
                Log in <BiLogIn size="1.1rem" className="ml-1 mt-[0.1rem]" />
              </div>
            </a>
          ) : (
            <div className="ml-4">
              <DropdownUser userName={userName} />
            </div>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-50 dark:bg-gray-800 dark:text-white dark:bg-boxdark px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only"></span>
              <img
                className="h-8 w-8"
                src="https://flowbite.com/docs/images/logo.svg"
                alt="My SaaS App"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close Menu</span>
              <AiFillCloseCircle className="h-6 w-6 " aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {isLoggedIn && <SidebarItem sidebarOpen={true} />}
              </div>
              <div className="py-6">
                {!userName ? (
                  <a href="/login">
                    <div className="flex justify-end items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white">
                      Log in <BiLogIn size="1.1rem" className="ml-1" />
                    </div>
                  </a>
                ) : (
                  <UserMenu />
                )}
              </div>
              <div className="py-6">
                Dark Mode? <DarkModeSwitcher />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default AppNavBar;
