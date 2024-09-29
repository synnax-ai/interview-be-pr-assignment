import { ScanCommand, ScanCommandOutput } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { StrictOmit } from "../helpers/datatypes.js";
import { ParticipantPersistence } from "../types/persistence.js";

export class ParticipantPersistenceClient {
  constructor(
    readonly tableName: string,
    protected readonly documentClient: DynamoDBDocumentClient,
  ) {}

  async put(item: ParticipantPersistence): Promise<void> {
    const commandInput: PutCommandInput = {
      TableName: this.tableName,
      Item: item,
    };
    const command = new PutCommand(commandInput);
    this.documentClient.send(command);
  }

  async count(): Promise<number> {
    const command = new ScanCommand({
      TableName: this.tableName,
      Select: "COUNT",
    });
    const result = await this.documentClient.send(command);

    return result.Count ?? 0;
  }

  async scan(): Promise<ParticipantPersistence[]> {
    const items: ParticipantPersistence[] = [];

    let exclusiveStartKey: any = undefined;
    do {
      const command = new ScanCommand({
        TableName: this.tableName,
        ExclusiveStartKey: exclusiveStartKey,
      });
      const result = (await this.documentClient.send(
        command,
      )) as ParticipantPersistenceScanOutput;
      exclusiveStartKey = result.LastEvaluatedKey;
      items.push(...(result.Items ?? []));
    } while (exclusiveStartKey);

    return items;
  }
}

export type ParticipantPersistenceScanOutput = StrictOmit<
  ScanCommandOutput,
  "Items"
> & {
  Items?: ParticipantPersistence[];
};
