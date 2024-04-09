import React, { FC } from "react";
import { usePagination } from "./core/usePagination";
import { cn } from "../utils/utils";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

interface PaginationProps {
    onPageChange: (pageNumber: number)=> void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
    className?: string;
}

const Pagination: FC<PaginationProps> = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
      } = props;
    
      const paginationRange = usePagination({totalCount, pageSize, siblingCount, currentPage});

      
        if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
            return null;
          }
    
          const onNext = () => {
            onPageChange(currentPage + 1);
          }
          const onPrevious = () => {
            onPageChange(currentPage - 1);
          }
        
          let lastPage = paginationRange? paginationRange[paginationRange.length - 1] : 1;
     

    return (
       <nav>
        <ul className="inline-flex -space-x-px text-sm">
            <li 
            >
                {/* // left Arraow */}
                <button type="button" disabled={currentPage === 1} className=
                "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" 
                
                onClick={onPrevious} >
                <MdOutlineKeyboardArrowLeft  />
                </button>
            </li>
            {paginationRange?.map((pageNumber: number | string) => {
                return (
                    <li key={pageNumber}>
                        <button  
                        onClick={() => onPageChange(pageNumber as number)}
                        className={cn(
                            "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white", 
                            {
                                "z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white": pageNumber === currentPage
                            })}
                        >
                        {pageNumber}
                        </button>
                    </li>
                );
            })}
            <li>
                <button type="button" disabled={currentPage === lastPage}
                className=
                    "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                     
                    onClick={onNext} 
                >
                <MdOutlineKeyboardArrowRight  />
                </button>
            </li>
        </ul>
       </nav>
    );
      
}

export default Pagination;