import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async () => {
  const types = ['Grain', 'Fertilizer', 'Livestock'];

  return {
    statusCode: 200,
    body: JSON.stringify(types),
  };
};