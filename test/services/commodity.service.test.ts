import { CommodityService } from '../../lib/lambdas/services/commodity.service';
import {Projection} from "../../lib/types/projection";
import {CsvService} from "../../lib/lambdas/services/csv.service";
import {S3FileService} from "../../lib/lambdas/services/s3-file.service";
import fs from "fs";
import path from "path";

describe('CommodityService', () => {
  let service: CommodityService;
  let mockCsvService: jest.Mocked<CsvService>;
  let mockS3Service: S3FileService;

  const csvContent: Projection[] = [
    {
      Attribute: 'Harvested acres',
      Commodity: 'Rice',
      CommodityType: 'NotCrops',
      Units: 'Thousand acres',
      YearType: 'Market year',
      Year: '2019/20',
      Value: 2472
    },
    {
      Attribute: 'Harvested acres',
      Commodity: 'Rice',
      CommodityType: 'Crops',
      Units: 'Thousand acres',
      YearType: 'Market year',
      Year: '2019/20',
      Value: 2472
    },
    {
      Attribute: 'Planted acres',
      Commodity: 'Oats',
      CommodityType: 'NotCrops',
      Units: 'Million acres',
      YearType: 'Market year',
      Year: '2026/27',
      Value: 2.8
    }
  ]

  const s3ServiceContent = fs.readFileSync(path.join(__dirname, '../', 'test-data.csv'), 'utf-8');

  beforeEach(() => {
    mockCsvService = {
      parseCsv: jest.fn().mockReturnValue(csvContent)
    } as jest.Mocked<CsvService>;
    mockS3Service = {
      getFileContent: jest.fn().mockResolvedValue(s3ServiceContent)
    } as Partial<S3FileService> as S3FileService;
    service = new CommodityService(mockCsvService, mockS3Service);
  });

  test('getHistogram should return objects', async () => {
    const result = await service.getHistogram("Commodity");
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test('getHistogram should get csv from s3', async () => {
    const result = await service.getHistogram("Commodity");
    expect(mockS3Service.getFileContent).toHaveBeenCalledTimes(1);
  })

  test('getHistogram should use csv service to parse data', async () => {
    const result = await service.getHistogram("Commodity");
    expect(mockCsvService.parseCsv).toHaveBeenCalledTimes(1);
  })

  test('getHistogram should return histogram with amount of times in the list', async () => {
    const result = await service.getHistogram("Commodity");
    let firstItem = result[0];
    expect(firstItem).toBeDefined();
    expect(firstItem.Description).toBe('Rice');
    expect(firstItem.Count).toBe(2);
    let secondItem = result[1];
    expect(secondItem.Description).toBe('Oats');
    expect(secondItem.Count).toBe(1);
  })

  test('getHistogram should return histogram with amount of times in the list_for_other_types', async () => {
    const result = await service.getHistogram("CommodityType");
    let firstItem = result[0];
    expect(firstItem).toBeDefined();
    expect(firstItem.Description).toBe('NotCrops');
    expect(firstItem.Count).toBe(2);
    let secondItem = result[1];
    expect(secondItem.Description).toBe('Crops');

    expect(secondItem.Count).toBe(1);
  })

  test('getHistogram should return histogram with amount of times in the list_for_Attributes', async () => {
    const result = await service.getHistogram("Attribute");
    let firstItem = result[0];
    expect(firstItem).toBeDefined();
    expect(firstItem.Description).toBe('Harvested acres');
    expect(firstItem.Count).toBe(2);
    let secondItem = result[1];
    expect(secondItem.Description).toBe('Planted acres');

    expect(secondItem.Count).toBe(1);
  })
});
