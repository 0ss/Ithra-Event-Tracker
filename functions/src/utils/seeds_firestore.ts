import axios from "axios"
import { ApplicationConfig } from "../config/application.config"
import { IthraEvent } from "../interfaces/ithra_event.response"
import { FirestoreService } from "../services/firestore.service"
import { IthraApiService } from "../services/ithra_api.service"
/**
 * It fetches events from the Ithra API, then adds them to Firestore
 */
const seedsFirestore = async () => {
  ApplicationConfig.run()
  /**
   * Fetch events from Ithra API
   */
  const res = await IthraApiService.getEvents()
  /**
   * extract events from response
   */
  const events = (res.items as IthraEvent[]) || []
  /**
   * Add events to Firestore
   */
  await FirestoreService.addEvents(events)
  console.log(
    "Seeding Firestore completed ✨",
    " Total events: ",
    events.length
  )
}
/**
 * Run the script
 */
seedsFirestore().catch((e) => {
  console.log("Could not seed firestore", e)
})
