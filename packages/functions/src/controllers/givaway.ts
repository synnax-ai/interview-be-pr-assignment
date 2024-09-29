import { randomUUID } from "crypto";
import { ParticipantPersistenceClient } from "../clients/participantPersistence.js";
import { TOTAL_GIVEAWAY_AMOUNT_IN_USD } from "../constants.js";
import { ParticipantPersistence } from "../types/persistence.js";
import { EnterGiveawayRequest } from "../types/request.js";
import { EnterGiveawayResponse } from "../types/response.js";

export class GivawayController {
  constructor(
    private readonly participantPersistenceClient: ParticipantPersistenceClient,
  ) {}

  async enter(request: EnterGiveawayRequest): Promise<EnterGiveawayResponse> {
    if (request.age > 18) {
      const numberOfParticipants =
        await this.participantPersistenceClient.count();

      const sharePerUser = TOTAL_GIVEAWAY_AMOUNT_IN_USD / numberOfParticipants;

      const participants = await this.participantPersistenceClient.scan();

      for (const participant of participants) {
        await this.participantPersistenceClient.put({
          ...participant,
          shareinUsd: sharePerUser,
          updatedAt: new Date().toISOString(),
        });
      }

      const newParticipant: ParticipantPersistence = {
        ...request,
        id: randomUUID(),
        shareinUsd: sharePerUser,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.participantPersistenceClient.put(newParticipant);

      return newParticipant;
    } else {
      return {
        error: "You must be at least 18 years old to enter the giveaway",
      };
    }
  }
}
