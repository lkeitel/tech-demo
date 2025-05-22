import { buildHistogramByField } from '../../lib/utils/histogram';

type TestItem = {
    category: string;
    value: number;
};

describe('buildHistogramByField', () => {
    const items: TestItem[] = [
        { category: 'A', value: 10 },
        { category: 'B', value: 20 },
        { category: 'A', value: 30 },
        { category: 'C', value: 40 },
        { category: 'B', value: 50 },
    ];

    test('counts occurrences for string field', () => {
        const result = buildHistogramByField(items, 'category');
        expect(result).toEqual(
            expect.arrayContaining([
                { Description: 'A', Count: 2 },
                { Description: 'B', Count: 2 },
                { Description: 'C', Count: 1 },
            ])
        );
        expect(result.length).toBe(3);
    });

    test('returns empty array if input is empty', () => {
        const result = buildHistogramByField([], 'category');
        expect(result).toEqual([]);
    });
});