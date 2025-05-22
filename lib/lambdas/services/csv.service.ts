
import { parse } from 'csv-parse/sync';

export class CsvService {
    parseCsv<T>(csvContent: string): T[] {
        return parse(csvContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
            cast: (value, context) => {
                if (!isNaN(Number(value)) && value.trim() !== '') {
                    return Number(value);
                }
                return value;
            },
        }) as T[];
    }
}