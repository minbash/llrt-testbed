import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction, OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { LlrtFunction } from './llrtFunction';
import path = require('path');
import { Topic } from 'aws-cdk-lib/aws-sns';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';


export class LlrtStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const topic = new Topic(this, 'Data');

    const lambdaNode = new NodejsFunction(this, 'node', {
      memorySize: 1024,
      architecture: Architecture.ARM_64,
      entry:  path.resolve(__dirname, './function.ts'),
      handler: 'lambdaHandler',
      runtime: Runtime.NODEJS_18_X,
      environment: {'SNS_ARN': topic.topicArn,},
      bundling: {
        minify: false,
        sourceMap: false,
        format: OutputFormat.ESM,
        externalModules: [
          '@aws-sdk/client-sns',
          '@aws-sdk/credential-providers',
        ]

      }      
    })
    new CfnOutput(this, 'lambdaNodeOut', { value: lambdaNode.functionArn})

    const lambdaLLRT = new LlrtFunction(this, 'llrt', {
      memorySize: 1024,
      architecture: Architecture.ARM_64,
      entry:  path.resolve(__dirname, './function.ts'),
      handler: 'lambdaHandler',
      runtime: Runtime.NODEJS_18_X,
      environment: {'SNS_ARN': topic.topicArn,},
      bundling: {
        minify: false,
        sourceMap: false,
        format: OutputFormat.ESM,
      }   
    })

    const snsTopicPolicy = new PolicyStatement({
      actions: ['sns:publish'],
      resources: ['*'],
    });

    lambdaLLRT.addToRolePolicy(snsTopicPolicy);
    lambdaNode.addToRolePolicy(snsTopicPolicy);


    new CfnOutput(this, 'lambdaLLRTOut', { value: lambdaLLRT.functionArn})

  }
}