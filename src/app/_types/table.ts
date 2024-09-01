
export type Column<T> = {
    key: keyof T;
    title: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
};