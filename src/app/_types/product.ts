
export interface Product {
    "Tracking ID": number;
    "Product Image": string;
    "Product Name": string;
    "Customer": string;
    "Date": string;
    "Amount": number;
    "Payment Mode": string;
    "Status": string;
}

export interface ProductColumn extends Product {
    'Actions'?: string
}