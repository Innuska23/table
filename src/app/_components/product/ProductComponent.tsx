"use client";

import React, { useState, useEffect } from "react";

import { Pagination } from "../shared/table/TablePagination";
import { ProductHeader } from "./ProductHeader";
import { ProductTable } from "./ProductTable";

import { Product } from "@/app/_types";
import Loader from "@/loading";

interface ApiResponse {
    data: Product[];
}

export default function ProductComponent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const getData = async (): Promise<Product[]> => {
        const response = await fetch(`/api/table`, {
            cache: "no-cache",
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: ApiResponse = await response.json();
        return data.data;
    };

    useEffect(() => {
        getData()
            .then((data) => setProducts(data))
            .catch(console.error)
    }, []);

    const filteredData = products.filter(
        (item) =>
            item["Product Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
            item["Customer"].toLowerCase().includes(searchTerm.toLowerCase()) ||
            item["Tracking ID"].toString().includes(searchTerm)
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const handleDelete = (id: number) => {
        setProducts(products.filter(item => item["Tracking ID"] !== id));
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "delivered":
                return "bg-[#ebf9f1] text-[#1f9254]";
            case "process":
                return "bg-[#fef2e5] text-[#cd6200]";
            case "cancelled":
                return "bg-[#fbe7e8] text-[#a30d11]";
            default:
                return "bg-white text-dark";
        }
    };

    return (
        <div className="min-h-screen p-4 bg-white text-black dark:bg-[#1D1E42] dark:text-white font-body">

            <ProductHeader
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <ProductTable currentRows={currentRows} getStatusColor={getStatusColor} handleDelete={handleDelete} />

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={Math.ceil(filteredData.length / rowsPerPage)}
            />
        </div>
    );
}