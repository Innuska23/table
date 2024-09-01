import React from 'react';

import { Input } from '../shared/Input';
import { ThemeToggle } from '../themeToggle/ThemeToggle';
import { Button } from '../shared/Button';

interface ProductHeaderProps {
    rowsPerPage: number;
    setRowsPerPage: (rowsPerPage: number) => void;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ rowsPerPage, setRowsPerPage, searchTerm, setSearchTerm }: ProductHeaderProps) => {
    return (
        <div className="flex justify-between items-center mb-4 xs-size">

            <div className="flex items-center gap-[24px]">
                <span className="mr-2">Show</span>
                <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="border rounded p-1 bg-[#E0E0E0] dark:bg-[#141432]"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                <span className="ml-2">entries</span>

                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-[#9E9E9E] rounded dark:border-white dark:bg-[#1D1E42] dark:placeholder-white"
                />

                <ThemeToggle />
            </div>

            <Button
                onClick={() => { }}
                className="bg-[#624de3] text-white px-4 py-2 rounded"
            >
                + Add Customer
            </Button>
        </div>
    );
};