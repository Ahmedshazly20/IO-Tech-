import type { TextareaHTMLAttributes } from "react";
export default function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return <textarea {...props} className={`border rounded px-3 py-2 ${props.className ?? ""}`} />;
}
