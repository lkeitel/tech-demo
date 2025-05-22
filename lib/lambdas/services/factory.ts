import { CsvService } from './csv.service';
import { CommodityService } from './commodity.service';
import {S3FileService} from "./s3-file.service";

export function createCommodityService() {
    const csvService = new CsvService();
    const s3Service = new S3FileService();
    return new CommodityService(csvService, s3Service);
}