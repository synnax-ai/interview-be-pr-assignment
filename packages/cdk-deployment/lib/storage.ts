import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class StorageStack extends Stack {
  participantsTable: TableV2;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
  }
}
