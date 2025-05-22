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

export const unitsHandler: APIGatewayProxyHandler = async () => {
  const data = await commodityService.getHistogram("Units");

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const yearTypeHandler: APIGatewayProxyHandler = async () => {
  const data = await commodityService.getHistogram("YearType");

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const yearHandler: APIGatewayProxyHandler = async () => {
  const data = await commodityService.getHistogram("Year");

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const attributeHandler: APIGatewayProxyHandler = async () => {
  const data = await commodityService.getHistogram("Attribute");

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};