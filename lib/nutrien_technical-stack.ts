import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class NutrienTechnicalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getCommoditiesLambda = new lambdaNodejs.NodejsFunction(this, 'GetCommoditiesLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../lib/lambdas/handlers/get-commodities.ts'),
      handler: 'handler',
      timeout: cdk.Duration.seconds(10),
    });

    const getCommodityTypesLambda = new lambdaNodejs.NodejsFunction(this, 'GetCommodityTypesLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../lib/lambdas/handlers/get-commodity-types.ts'),
      handler: 'handler',
    });

    const api = new apigateway.RestApi(this, 'TechnicalDemoApi', {
      restApiName: 'Demo Service',
    });

    const commodity = api.root.addResource('Commodity');
    const histogram = commodity.addResource('histogram');
    histogram.addMethod('GET', new apigateway.LambdaIntegration(getCommoditiesLambda));

    const commodityType = api.root.addResource('CommodityType');
    const typeHistogram = commodityType.addResource('histogram');
    typeHistogram.addMethod('GET', new apigateway.LambdaIntegration(getCommodityTypesLambda));

    getCommoditiesLambda.addEnvironment('PROJECTION_BUCKET', 'nutrien-technical');
    getCommoditiesLambda.addEnvironment('PROJECTION_KEY', 'Projection2021.csv');
    const dataBucket = s3.Bucket.fromBucketName(this, 'ProjectionBucket', 'nutrien-technical');

    dataBucket.grantRead(getCommoditiesLambda);
  }
}