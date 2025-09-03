export default function EmptyState({ text = "No data" }: { text?: string }) {
    return <div className="text-gray-500">{text}</div>;
}
