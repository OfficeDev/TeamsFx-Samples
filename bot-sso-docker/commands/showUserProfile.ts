import { ResponseType, Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { CardFactory, TurnContext } from "botbuilder";
import { OnBehalfOfUserCredential } from "@microsoft/teamsfx";
import { SSOCommand } from "./SSOCommand";
import oboAuthConfig from "../authConfig";

export class ShowUserProfile implements SSOCommand {
  commandMessage = "show";

  async operationWithSSOToken(context: TurnContext, ssoToken: string) {
    await context.sendActivity(
      "Retrieving user information from Microsoft Graph ..."
    );

    // Call Microsoft Graph half of user
    const oboCredential = new OnBehalfOfUserCredential(ssoToken, oboAuthConfig);

    // Create an instance of the TokenCredentialAuthenticationProvider by passing the tokenCredential instance and options to the constructor
    const authProvider = new TokenCredentialAuthenticationProvider(
      oboCredential,
      {
        scopes: ["User.Read"],
      }
    );

    // Initialize Graph client instance with authProvider
    const graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
    const me = await graphClient.api("/me").get();
    if (me) {
      await context.sendActivity(
        `You're logged in as ${me.displayName} (${me.userPrincipalName})${
          me.jobTitle ? `; your job title is: ${me.jobTitle}` : ""
        }.`
      );

      // show user picture
      let photoBinary: ArrayBuffer;
      try {
        photoBinary = await graphClient
          .api("/me/photo/$value")
          .responseType(ResponseType.ARRAYBUFFER)
          .get();
      } catch {
        return;
      }

      const buffer = Buffer.from(photoBinary);
      const imageUri = "data:image/png;base64," + buffer.toString("base64");
      const card = CardFactory.thumbnailCard(
        "User Picture",
        CardFactory.images([imageUri])
      );
      await context.sendActivity({ attachments: [card] });
    } else {
      await context.sendActivity(
        "Could not retrieve profile information from Microsoft Graph."
      );
    }
  }
}
