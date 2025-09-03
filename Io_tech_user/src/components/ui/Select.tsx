import type { SelectHTMLAttributes } from "react";
export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
    return <select {...props} className={`border rounded px-3 py-2 ${props.className ?? ""}`} />;
}
