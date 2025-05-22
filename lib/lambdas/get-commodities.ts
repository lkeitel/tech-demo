import { APIGatewayProxyHandler } from 'aws-lambda';
import { Projection } from '../types/projection';

export const handler: APIGatewayProxyHandler = async () => {
  const commodities: Projection[]  = [
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
      CommodityType: 'Crops',
      Units: 'Million acres',
      YearType: 'Market year',
      Year: '2026/27',
      Value: 2.8
    }
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(commodities),
  };
};