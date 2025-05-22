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
    const sharedEnv = {
      PROJECTION_BUCKET: 'nutrien-technical',
      PROJECTION_KEY: 'Projection2021.csv',
    };

    const getCommoditiesLambda = new lambdaNodejs.NodejsFunction(this, 'GetCommoditiesLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../lib/lambdas/handlers/get-commodities.ts'),
      handler: 'commodityHandler',
      environment: sharedEnv,
      timeout: cdk.Duration.seconds(10),
    });

    const getAttributeLambda = new lambdaNodejs.NodejsFunction(this, 'GetAttributeLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../lib/lambdas/handlers/get-commodities.ts'),
      handler: 'attributeHandler',
      environment: sharedEnv,
      timeout: cdk.Duration.seconds(10),
    });

    const getUnitsLambda = new lambdaNodejs.NodejsFunction(this, 'GetUnitsLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../lib/lambdas/handlers/get-commodities.ts'),
      handler: 'unitsHandler',
      environment: sharedEnv,
      timeout: cdk.Duration.seconds(10),
    });

    const getYearTypesLambda = new lambdaNodejs.NodejsFunction(this, 'GetYearTypeLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../lib/lambdas/handlers/get-commodities.ts'),
      handler: 'yearTypeHandler',
      environment: sharedEnv,
      timeout: cdk.Duration.seconds(10),
    });

    const getYearLambda = new lambdaNodejs.NodejsFunction(this, 'GetYearLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../lib/lambdas/handlers/get-commodities.ts'),
      handler: 'yearHandler',
      environment: sharedEnv,
      timeout: cdk.Duration.seconds(10),
    });

    const getCommodityTypesLambda = new lambdaNodejs.NodejsFunction(this, 'GetCommodityTypeLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../lib/lambdas/handlers/get-commodities.ts'),
      handler: 'commodityTypesHandler',
      environment: sharedEnv,
      timeout: cdk.Duration.seconds(10),
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

    const unit = api.root.addResource('Unit');
    const unitHistogram = unit.addResource('histogram');
    unitHistogram.addMethod('GET', new apigateway.LambdaIntegration(getUnitsLambda));

    const attribute = api.root.addResource('Attribute');
    const attributeHistogram = attribute.addResource('histogram');
    attributeHistogram.addMethod('GET', new apigateway.LambdaIntegration(getAttributeLambda));

    const yearType = api.root.addResource('YearType');
    const yearTypeHistogram = yearType.addResource('histogram');
    yearTypeHistogram.addMethod('GET', new apigateway.LambdaIntegration(getYearTypesLambda));

    const year = api.root.addResource('Year');
    const yearHistogram = year.addResource('histogram');
    yearHistogram.addMethod('GET', new apigateway.LambdaIntegration(getYearLambda));

    const dataBucket = s3.Bucket.fromBucketName(this, 'ProjectionBucket', 'nutrien-technical');

    dataBucket.grantRead(getCommoditiesLambda);
    dataBucket.grantRead(getCommodityTypesLambda);
    dataBucket.grantRead(getUnitsLambda);
    dataBucket.grantRead(getAttributeLambda);
    dataBucket.grantRead(getYearTypesLambda);
    dataBucket.grantRead(getYearLambda);
  }
}