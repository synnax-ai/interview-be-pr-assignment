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

    const enterGiveawayFunction = new NodejsFunction(
      scope,
      "EnterGiveawayFunction",
      {
        entry: path.join(
          import.meta.dirname,
          "../../functions/src/handlers/api.ts",
        ),
        runtime: Runtime.NODEJS_20_X,
        environment: {
          PARTICIPANTS_TABLE_NAME:
            props.storageStack.participantsTable.tableName,
        },
        handler: "enterGiveaway",
      },
    );

    const enterGiveawayFunctionUrl = enterGiveawayFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, "EnterGiveawayFunctionUrl", {
      value: enterGiveawayFunctionUrl.url,
      exportName: "EnterGiveawayFunctionUrl",
    });
  }
}
