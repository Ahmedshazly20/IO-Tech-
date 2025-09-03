export function track(event: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV !== "production") {
        console.log("[analytics]", event, data);
    }
}
