import axios from "axios"
import { IthraEvent } from "../interfaces/ithra_event.response"
import { IthraEventRequest } from "../interfaces/ithra_event_request.interfaces"
import { IthraEventsResponse } from "../interfaces/ithra_event_response.interface"
import { Constants } from "../utils/constant.utils"

/**
 * A service to bridge the gap between the Ithra API and the app
 */
export class IthraApiService {
  /**
   * It makes a POST request to the API endpoint with a body containing the page number, page size,
   * search text and sort order
   * @returns An array of events
   */
  static async getEvents(): Promise<IthraEventsResponse> {
    /* The body of the request that is sent to the API. */
    const body: IthraEventRequest = {
      pageNo: 1,
      pageSize: 100,
      searchText: "",
      sortOrder: "Asc",
    }
    /* Making a POST request to the API endpoint with a body containing the page number, page size,
     * search text and sort order */
    const events = await axios({
      method: "POST",
      url: Constants.END_POINT,
      data: body,
    })

    return events.data
  }
  /**
   * It takes an event object, makes a request to the API, and returns the Arabic translation of the
   * event
   * @param {IthraEvent} event - IthraEvent - The event object that is returned from the API.
   * @returns the arabic translation of the event.
   */
  static async getEventArabicTranslation(
    event: IthraEvent
  ): Promise<IthraEvent> {
    /* The body of the request that is sent to the API. */
    const body: IthraEventRequest = {
      pageNo: 1,
      pageSize: 100,
      searchText: "",
      sortOrder: "Asc",
    }
    /* Making a POST request to the API endpoint with a body containing the page number, page size,
     * search text and sort order. */
    const arabicEvents = await axios({
      method: "POST",
      url: Constants.END_POINT,
      data: body,
      headers: {
        "x-language": "ar-SA",
      },
    })
    /* Finding the arabic translation of the event. */
    const arabicEvent = arabicEvents.data.items.find((arabicEvent) => {
      return arabicEvent.id === event.id
    })
    return arabicEvent
  }
}
