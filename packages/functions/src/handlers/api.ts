import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { ParticipantPersistenceClient } from "../clients/participantPersistence.js";
import { GivawayController } from "../controllers/givaway.js";
import { EnterGiveawayRequest } from "../types/request.js";
import { EnterGiveawayResponse } from "../types/response.js";
import { assertEnterGiveawayRequest } from "../validators/types/generated/index.js";

const config = {
  PARTICIPANTS_TABLE_NAME: process.env["PARTICIPANTS_TABLE_NAME"] ?? "",
};

const ddbClient = new DynamoDBClient();
const documentClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions: { removeUndefinedValues: true },
});

const participantPersistenceClient = new ParticipantPersistenceClient(
  config.PARTICIPANTS_TABLE_NAME,
  documentClient,
);
const giveawayController = new GivawayController(participantPersistenceClient);

export const enterGiveaway: APIGatewayProxyHandlerV2<
  EnterGiveawayResponse
> = async (event, context) => {
  const request = JSON.parse(event.body!) as EnterGiveawayRequest;
  assertEnterGiveawayRequest(request);

  return giveawayController.enter(request);
};
