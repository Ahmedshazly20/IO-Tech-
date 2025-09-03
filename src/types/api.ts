export type StrapiList<T> = { data: Array<{ id: number; attributes: T }>; meta?: any };
export type StrapiItem<T> = { data: { id: number; attributes: T } | null; meta?: any };
