import { IthraEvent } from "./ithra_event.response"

export interface TweetFormat {
  event: IthraEvent
  startDate: string
  endDate: string
  link: string
}
