import { config } from "dotenv"
import admin from "firebase-admin"
/**
 * Configuration for the application.
 */
export class ApplicationConfig {
  /* A static method that is called when the application starts. It is used to configure the
 application. */
  public static run() {
    config({
      path: ".env",
    })
    admin.initializeApp()
  }
}
