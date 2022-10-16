import axios from "axios"

/**
 * Service to communicate with Rebrandly API
 */
export class RebrandlyService {
  /**
   * It takes a URL as an argument, sends a POST request to the Rebrandly API, and returns the shortened
   * URL
   * @param {string} url - The URL you want to shorten
   * @returns The shortUrl is being returned.
   */
  static async shortenUrl(url: string): Promise<string> {
    /* Sending a POST request to the Rebrandly API, and returns the shortened URL */
    const data = await axios({
      method: "POST",
      url: "https://api.rebrandly.com/v1/links",
      data: {
        destination: url,
        domain: {},
      },
      headers: {
        apiKey: process.env.REBRANDLY_TOKEN,
      },
    })
    return data.data.shortUrl
  }
}
