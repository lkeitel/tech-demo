import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export class S3FileService {
    private s3 = new S3Client({});

    async getFileContent(bucket: string, key: string): Promise<string> {
        const command = new GetObjectCommand({ Bucket: bucket, Key: key });
        const response = await this.s3.send(command);

        const stream = response.Body as Readable;

        return new Promise((resolve, reject) => {
            let data = '';
            stream.on('data', chunk => (data += chunk));
            stream.on('end', () => resolve(data));
            stream.on('error', reject);
        });
    }
}