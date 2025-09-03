import type { ButtonHTMLAttributes, ReactNode } from "react";
export default function Button({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }) {
    return <button {...props} className={`px-4 py-2 rounded ${className}`}>{children}</button>;
}
