export async function http<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
    const res = await fetch(input, { ...init, headers: { "Content-Type": "application/json", ...(init?.headers || {}) } });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
    }
    return res.json() as Promise<T>;
}
