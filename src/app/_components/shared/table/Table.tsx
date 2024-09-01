import { Column } from "@/app/_types";

type TableComponentProps<T> = {
    columns: Column<T>[];
    data: T[];
};

export const Table = <T,>({ columns, data }: TableComponentProps<T>) => {

    return <table className="min-w-full bg-white dark:bg-[#1d1e42] m-size min-h-screen" >
        <thead className="px-4 py-4">

            <tr >
                {columns.map((column) => (
                    <th
                        key={String(column.key)}
                        className="px-4 py-4 text-left"
                    >
                        {column.title}
                    </th>
                ))}
            </tr>
        </thead>

        <tbody>
            {data.map((row, index) => (
                <tr key={index}
                    className={index % 2 === 0 ? "bg-[#F7F6FE] dark:bg-[#1D1E42]" : "bg-white dark:bg-[#26264f]"}
                >
                    {columns.map((column) => (
                        <td key={String(column.key)} className="px-4 py-4">
                            {column.render
                                ? column.render(row[column.key], row)
                                : (row[column.key] as React.ReactNode)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
}