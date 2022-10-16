import { ApplicationConfig } from "./config/application.config"
import { FirestoreService } from "./services/firestore.service"
import { IthraApiService } from "./services/ithra_api.service"
import { TwitterService } from "./services/twitter.service"

/**
 * It fetches all the events from the Ithra API, checks if there are any new events, and if there are,
 * it tweets about them.
 * The main job of the application
 */
export const job = async () => {
  /**
   * Initialize the application
   */
  ApplicationConfig.run()
  console.log("Starting job . . .")
  /**
   * Initialize Twitter API
   */
  const client = new TwitterService()
  /**
   * Get all stored events from firestore
   */
  const storedEvents = await FirestoreService.getStoredEvents()
  console.log("storedEvents: ", storedEvents.length)
  /**
   * Get all events from Ithra API
   */
  const events = await IthraApiService.getEvents()
  console.log("Ithra events: ", events.items.length)
  /**
   * Filter out the events that are already stored in firestore
   */
  const newEvents = events.items.filter((event) => {
    return !storedEvents.find((storedEvent) => storedEvent.id === event.id)
  })
  console.log("Found new events: ", newEvents.length)
  /**
   * If there are new events, tweet about them and store them in firestore to avoid duplicate tweets
   */
  if (newEvents.length > 0) {
    newEvents.forEach(async (event) => {
      const arabicEvent = await IthraApiService.getEventArabicTranslation(event)
      await client.tweetNewEvent({
        eventInArabic: arabicEvent,
        eventInEnglish: event,
      })
    })
    await FirestoreService.addEvents(newEvents)
  }
}
