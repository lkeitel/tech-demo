import {Projection} from "../../types/projection";
import {CsvService} from "./csv.service";
import {S3FileService} from "./s3-file.service";
import {Histogram} from "../../types/histogram";
import {buildHistogramByField} from "../../utils/histogram";

export class CommodityService {
    constructor(
        private csvService: CsvService,
        private s3Service: S3FileService
    ) {}

    private bucket : string = process.env.PROJECTION_BUCKET ?? '';
    private key : string = process.env.PROJECTION_KEY ?? '';

    async getHistogram(field: keyof Projection): Promise<Histogram[]> {
        const csvText = await this.s3Service.getFileContent(this.bucket, this.key);
        let parsedProjection = this.csvService.parseCsv<Projection>(csvText);
        return buildHistogramByField(parsedProjection, field);
    }
}