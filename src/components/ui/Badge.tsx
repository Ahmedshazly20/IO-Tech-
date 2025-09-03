﻿export default function Badge({ children }: { children: React.ReactNode }) {
    return <span className="inline-block text-xs px-2 py-1 rounded bg-gray-100">{children}</span>;
}
