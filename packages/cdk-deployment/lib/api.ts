import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { FunctionUrlAuthType, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";
import { StorageStack } from "./storage.js";

export interface ApiStackProps extends StackProps {
  storageStack: StorageStack;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
  }
}
