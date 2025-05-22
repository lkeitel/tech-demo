import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class NutrienTechnicalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getCommoditiesLambda = new lambda.Function(this, 'GetCommoditiesLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'get-commodities.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../dist/lambdas')),
    });

    const getCommodityTypesLambda = new lambda.Function(this, 'GetCommodityTypesLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'get-commodity-types.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../dist/lambdas')),
    });

    const api = new apigateway.RestApi(this, 'CommodityApi', {
      restApiName: 'Commodity Service',
    });

    const commodity = api.root.addResource('commodity');
    commodity.addMethod('GET', new apigateway.LambdaIntegration(getCommoditiesLambda));

    const type = commodity.addResource('type');
    type.addMethod('GET', new apigateway.LambdaIntegration(getCommodityTypesLambda));
  }
}