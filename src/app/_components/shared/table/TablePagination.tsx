import React from 'react';

import { Button } from '../Button';

interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, totalPages }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(currentPage - 1, 1);
        let endPage = Math.min(startPage + 2, totalPages);

        if (endPage - startPage < 2) {
            startPage = Math.max(endPage - 2, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${currentPage === i
                        ? "bg-[#624DE3] dark:bg-[#624DE3] text-white"
                        : "bg-white dark:bg-[#141432] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                >
                    {i}
                </Button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-4 dark:bg-[#1D1E42] xs-size">
            <Button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-white  text-[#9e9e9e] dark:text-gray-200 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#1D1E42]"
            >
                Previous
            </Button>
            {renderPageNumbers()}

            <Button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-white text-[#9e9e9e] dark:text-gray-200 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#1D1E42]"
            >
                Next
            </Button>
        </div>
    );
};