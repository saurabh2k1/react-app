import React, { useEffect, useState } from "react";
import { MdSpaceDashboard, MdEmail,  MdMarkEmailUnread } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { TfiDashboard } from "react-icons/tfi";

import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const UserMenu = ({setMobileMenuOpen}:{setMobileMenuOpen?: any}) => {
    
    const handleMobileMenuClick = () => {
        if (setMobileMenuOpen) setMobileMenuOpen(false);
    };

    const logout = () => {
        //
    }

    const linkClass = "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group";
    const iconeClass = "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";

    return (
    <div className="px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
            <li>
                <a href="/" className={linkClass} >
                    <MdSpaceDashboard className={iconeClass} />
                    <span className="ms-3">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="/profile" className={linkClass}>
                    <IoSettingsSharp className={iconeClass} />
                    <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                </a>
            </li>
            <li>
                <a href="/inbox"  className={linkClass}>
                    <MdEmail className={iconeClass} />
                    <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                </a>
            </li>
            <li>
                <button type="button" className={linkClass} onClick={logout} >
                    <FiLogOut className={iconeClass} />
                    <span className="ms-3">Logout</span>
                </button>
            </li>
        </ul>
    </div>
    );
}

export default UserMenu;