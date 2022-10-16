import { pubsub } from "firebase-functions/v1"
import { job } from "./job"
import { Constants } from "./utils/constant.utils"

export const scheduler = pubsub
  .schedule(Constants.RUNNING_PERIOD)
  .onRun(async () => {
    try {
      await job()
    } catch (e) {}
  })
