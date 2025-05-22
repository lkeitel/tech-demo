

import { CsvService } from '../../lib/lambdas/services/csv.service';

import {Projection} from "../../lib/types/projection";
import path from "path";
import fs from "fs";


describe('CsvService', () => {
  let service: CsvService;

  beforeEach(() => {
    service = new CsvService();
  });

  test('parses test-data.csv into Projection objects', () => {
      const csvPath = path.join(__dirname, '..', 'test-data.csv');
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const projections = service.parseCsv<Projection>(csvContent);

      expect(Array.isArray(projections)).toBe(true);
      expect(projections.length).toBeGreaterThan(0);

      expect(projections[0]).toHaveProperty('Commodity');
      expect(typeof projections[0].Value).toBe('number');
  });
});