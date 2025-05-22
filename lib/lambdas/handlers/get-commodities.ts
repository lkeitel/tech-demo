import { APIGatewayProxyHandler } from 'aws-lambda';
import {createCommodityService} from "../services/factory";

const commodityService = createCommodityService();

export const commodityHandler: APIGatewayProxyHandler = async () => {
  const data = await commodityService.getHistogram("Commodity");

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const commodityTypesHandler: APIGatewayProxyHandler = async () => {
  const data = await commodityService.getHistogram("CommodityType");

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};