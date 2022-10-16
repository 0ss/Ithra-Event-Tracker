import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { TwitterApi } from "twitter-api-v2"
import { NewTweet } from "../interfaces/new_tweet.interface"
import { TweetFormat } from "../interfaces/tweet_format.interface"
import { RebrandlyService } from "./rebrandly.service"
dayjs.extend(relativeTime)
/**
 * Service that communicate with Twitter API
 */
export class TwitterService {
  private readonly _twitterClient: TwitterApi

  constructor() {
    const appKey: string = process.env.API_KEY!
    const appSecret: string = process.env.API_KEY_SECRET!
    const accessToken: string = process.env.ACCESS_TOKEN!
    const accessSecret: string = process.env.ACCESS_TOKEN_SECRET!
    this._twitterClient = new TwitterApi({
      appKey,
      appSecret,
      accessToken,
      accessSecret,
    })
  }
  /**
   * It takes an event object in both English and Arabic, formats them into a tweet, and then tweets
   * them
   * @param  - IthraEvent is the event object that we get from the database.
   */
  public async tweetNewEvent(newTweet: NewTweet) {
    const { eventInArabic, eventInEnglish } = newTweet
    /**
     * the link if the opportunity
     */
    let link = `https://volunteer.ithra.com/opportunities/${eventInEnglish.id}`
    /**
     * formart start date into readable one
     */
    const startDate = new Date(eventInEnglish.startDateTime).toDateString()
    /**
     * formart end date into readable one
     */
    const endDate = new Date(eventInEnglish.endDateTime).toDateString()
    /**
     * call Rebrandly API to get the short link
     */
    const shorted = await RebrandlyService.shortenUrl(link)
    /**
     * if we were able to shortne the link, the update the old link with shorted version
     */
    if (shorted) link = shorted
    /**
     * format english tweet
     */
    const englishTweet = this.formatEnglish({
      event: eventInEnglish,
      startDate,
      endDate,
      link,
    })
    /**
     * format arabic twweet
     */
    const arabicTweet = this.formatArabic({
      event: eventInArabic,
      startDate,
      endDate,
      link,
    })
    /**
     * tweets on both langauges
     */
    await this._twitterClient.v2.tweet(englishTweet)
    await this._twitterClient.v2.tweet(arabicTweet)
  }
  private formatEnglish(tweetFormat: TweetFormat): string {
    const { event, link, startDate, endDate } = tweetFormat
    let tweet = ""
    tweet += `📣 Title: ${event.title}\n\n`
    tweet += `⚡️ Description : ${event.description
      .substring(0, 97)
      .concat("...")}\n\n`
    tweet += `🗓 Start: ${startDate}\n\n`
    tweet += `🗓 End: ${endDate}\n\n`
    tweet += `🌍 Link: ${link}\n\n`
    return tweet
  }
  private formatArabic(tweetFormat: TweetFormat): string {
    const { event, link, startDate, endDate } = tweetFormat

    let tweet = ""
    tweet += `📣 العنوان: ${event.title}\n\n`
    tweet += `⚡️ الوصف : ${event.description
      .substring(0, 97)
      .concat("...")}\n\n`
    tweet += `🗓 بداية: ${startDate}\n\n`
    tweet += `🗓 نهاية: ${endDate}\n\n`
    tweet += `🌍 الرابط: ${link}\n\n`
    return tweet
  }
}
