import { APIGatewayProxyHandler } from 'aws-lambda';
import {createCommodityService} from "../services/factory";

const commodityService = createCommodityService();

export const handler: APIGatewayProxyHandler = async () => {
  const data = await commodityService.getHistogram();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};