export type NormalizedError = { message: string; status?: number };
export const normalizeError = (e: unknown): NormalizedError => {
    if (e instanceof Error) return { message: e.message };
    return { message: "Unknown error" };
};
