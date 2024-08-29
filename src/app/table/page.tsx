"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { Table } from "../types/table";
import Image from 'next/image';

interface ApiResponse {
  data: Table[];
}

export default function TableComponent() {
  const [products, setProducts] = useState<Table[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [theme, setTheme] = useState("light");

  const getData = async (): Promise<Table[]> => {
    const response = await fetch(`/api/table`, {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: ApiResponse = await response.json();
    return data.data; // Return the array of Table
  };

  useEffect(() => {
    getData()
      .then((data) => setProducts(data)) // Set products directly to data
      .catch(console.error); // Handle errors
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
    alert(`Delete row with id: ${id}`);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "process":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} p-5`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="mr-2">Show</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded p-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2">entries</span>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={toggleTheme}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Toggle Theme
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Tracking ID</th>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Payment Mode</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item) => (
            <tr key={item["Tracking ID"]} className="border-b">
              <td className="px-4 py-2">#{item["Tracking ID"]}</td>
              <td className="px-4 py-2 w-32 flex items-center">
                <Image
                  src={item["Product Image"]}
                  alt={item["Product Name"]}
                  width={32} 
                  height={32}
                  className="mr-2 rounded"
                />
                <span className="truncate">{item["Product Name"]}</span>
              </td>
              <td className="px-4 py-2">{item["Customer"]}</td>
              <td className="px-4 py-2">{item["Date"]}</td>
              <td className="px-4 py-2">${item["Amount"].toFixed(2)}</td>
              <td className="px-4 py-2">{item["Payment Mode"]}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item["Status"])}`}>
                  {item["Status"]}
                </span>
              </td>
              <td className="px-4 py-2">
                <button className="text-blue-500 mr-2">
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item["Tracking ID"])}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <span>
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredData.length)} of {filteredData.length} entries
        </span>
        <div className="flex">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="mx-1 p-2 border rounded"
          >
            <ChevronLeft size={16} />
          </button>
          {[...Array(Math.ceil(filteredData.length / rowsPerPage))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 p-2 border rounded ${currentPage === index + 1 ? "bg-purple-600 text-white" : ""}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / rowsPerPage)))
            }
            disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
            className="mx-1 p-2 border rounded"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}