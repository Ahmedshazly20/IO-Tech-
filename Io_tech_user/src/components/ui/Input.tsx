import type { InputHTMLAttributes } from "react";
export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className={`border rounded px-3 py-2 ${props.className ?? ""}`} />;
}
