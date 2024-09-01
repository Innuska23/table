import { ButtonHTMLAttributes } from "react"

export const Button = ({ className, onClick, children, disabled }: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <button className={className} onClick={onClick} disabled={disabled}> {children}</button>
}