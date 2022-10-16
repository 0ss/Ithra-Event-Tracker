import admin from "firebase-admin"
import { IthraEvent } from "../interfaces/ithra_event.response"

/**
 * A service to communicate with Firestore
 */
export class FirestoreService {
  /**
   * It gets all the events from the database and returns them as an array of IthraEvent objects
   * @returns An array of IthraEvent objects
   */
  static async getStoredEvents(): Promise<IthraEvent[]> {
    const events = await admin.firestore().collection("events").get()
    return events.docs.map((doc) => doc.data() as IthraEvent)
  }
  /**
   * It takes an array of events, and for each event, it adds it to the database
   * @param {IthraEvent[]} events - IthraEvent[]
   */
  static async addEvents(events: IthraEvent[]) {
    events.forEach(async (event) => {
      await admin.firestore().collection("events").doc(event.id).set(event)
    })
  }
}
