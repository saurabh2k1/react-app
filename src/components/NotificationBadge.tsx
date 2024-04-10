import React, { FC } from "react";
import { FaBell } from "react-icons/fa6";

const NotificationBadge:React.FC<{count: number}> = ({count}) => {

    return (
     <button type="button" className="relative inline-flex items-center p-2 text-sm font-medium text-center text-gray-700  dark:text-gray-400 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300  ">
       <FaBell className="w-5 h-5"/>
       <span className="sr-only">Notification</span>
       <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
         {count}
       </div>
    </button>);
}

export default NotificationBadge;
