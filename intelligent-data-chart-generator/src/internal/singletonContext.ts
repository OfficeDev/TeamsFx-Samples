import { TeamsUserCredential } from "@microsoft/teamsfx";

/**
 * Singleton class for managing the TeamsUserCredential instance.
 */
export class TeamsUserCredentialContext {
  private static instance: TeamsUserCredentialContext;
  private credential: TeamsUserCredential | undefined;

  /**
   * Private constructor to prevent instantiation from outside the class.
   */
  private constructor() {}

  /**
   * Returns the singleton instance of TeamsUserCredentialContext.
   * If the instance does not exist, it creates one.
   * @returns The singleton instance of TeamsUserCredentialContext.
   */
  public static getInstance(): TeamsUserCredentialContext {
    if (!TeamsUserCredentialContext.instance) {
      TeamsUserCredentialContext.instance = new TeamsUserCredentialContext();
    }

    return TeamsUserCredentialContext.instance;
  }

  /**
   * Sets the TeamsUserCredential instance.
   * @param credential The TeamsUserCredential instance to set.
   */
  public setCredential(credential: TeamsUserCredential) {
    this.credential = credential;
  }

  /**
   * Gets the TeamsUserCredential instance.
   * If the instance does not exist, it creates one.
   * @returns The TeamsUserCredential instance.
   */
  public getCredential() {
    if (!this.credential) {
      this.credential = new TeamsUserCredential({
        initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL!,
        clientId: process.env.REACT_APP_CLIENT_ID!,
      });
    }
    return this.credential;
  }
}
