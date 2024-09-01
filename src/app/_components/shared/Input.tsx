import { InputHTMLAttributes } from "react"

export const Input = ({ type, placeholder, value, onChange, className }: InputHTMLAttributes<HTMLInputElement>) => {
    return <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={className} />
}