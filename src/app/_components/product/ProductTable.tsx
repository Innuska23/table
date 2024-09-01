import React from "react";
import { Edit, Trash2 } from "lucide-react";

import { Button } from "../shared/Button";
import { Column, Product, ProductColumn } from "@/app/_types";
import { Table } from './../shared/table/Table'

interface ProductTableProps {
    currentRows: Product[];
    getStatusColor: (status: string) => void;
    handleDelete: (id: number) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ getStatusColor, handleDelete, currentRows }) => {
    const columns: Column<ProductColumn>[] = [
        {
            key: 'Tracking ID', title: 'Tracking ID', render(value, row) {
                return <div className="text-center">#{value} </div>
            },
        },
        {
            key: 'Product Name', title: 'Product Name', render(value, row) {
                return <div className="flex items-center text-center w-full"> <img
                    src={row["Product Image"]}
                    alt={row["Product Name"]}
                    width={32}
                    height={32}
                    className="mr-2 rounded w-[32px] h-[32px] object-cover"
                />
                    <span className="truncate" > {row["Product Name"]} </span></div>
            },
        },
        { key: 'Customer', title: 'Customer' },
        {
            key: 'Date', title: 'Date', render(value) {
                const [year, month, day] = (value as string).split('-');
                return <span>{`${day}/${month}/${year}`}</span>;
            },
        },
        {
            key: 'Amount', title: 'Amount', render(value, row) {
                return <span> ${value} </span >
            },
        },
        { key: 'Payment Mode', title: 'Payment Mode' },
        {
            key: 'Status', title: 'Status', render(value, row) {
                return <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(row["Status"])}`}>
                    {row.Status}
                </span>
            },
        },
        {
            key: 'Actions',
            title: 'Actions',
            render: (_, row) => (<>
                <Button className="text-[#624DE3] mr-4" >
                    <Edit size={24} />
                </Button>
                < Button
                    onClick={() => handleDelete(row["Tracking ID"])}
                    className="text-[#A30D11]"
                >
                    <Trash2 size={24} />
                </Button></>
            )
        }
    ];

    return <Table columns={columns} data={currentRows} />

}