import {Projection} from "../types/projection";

export function buildHistogramByField<T>(
    items: T[],
    field: keyof T
): { Description: string; Count: number }[] {
    return Object.entries(
        items.reduce<Record<string, number>>((acc, item) => {
            const key = String(item[field]);
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {})
    ).map(([Description, Count]) => ({ Description, Count }));
}