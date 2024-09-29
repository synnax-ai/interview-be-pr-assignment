import typia from "typia";
import { EnterGiveawayRequest } from "../../../types/request.js";

export const assertEnterGiveawayRequest =
  typia.createAssertEquals<EnterGiveawayRequest>();
