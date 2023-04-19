/* This code sample provides a starter kit to implement server side logic for your Teams App in TypeScript,
 * refer to https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference for complete Azure Functions
 * developer guide.
 */

// Import polyfills for fetch required by msgraph-sdk-javascript.
import "isomorphic-fetch";

import { Context, HttpRequest } from "@azure/functions";
import { Client } from "@microsoft/microsoft-graph-client";
import {
  createMicrosoftGraphClient,
  createMicrosoftGraphClientWithCredential,
  IdentityType,
  OnBehalfOfCredentialAuthConfig,
  OnBehalfOfUserCredential,
  TeamsFx,
} from "@microsoft/teamsfx";

import config from "../config";
import { getInstallationId } from "./getInstallationId";

interface Response {
  status: number;
  body: { [key: string]: any };
}

type TeamsfxContext = { [key: string]: any };

/**
 * This function handles requests from teamsfx client.
 * The HTTP request should contain an SSO token queried from Teams in the header.
 * Before trigger this function, teamsfx binding would process the SSO token and generate teamsfx configuration.
 *
 * This function initializes the teamsfx SDK with the configuration and calls these APIs:
 * - TeamsFx().setSsoToken() - Construct teamsfx instance with the received SSO token and initialized configuration.
 * - getUserInfo() - Get the user's information from the received SSO token.
 * - createMicrosoftGraphClient() - Get a graph client to access user's Microsoft 365 data.
 *
 * The response contains multiple message blocks constructed into a JSON object, including:
 * - An echo of the request body.
 * - The display name encoded in the SSO token.
 * - Current user's Microsoft 365 profile if the user has consented.
 *
 * @param {Context} context - The Azure Functions context object.
 * @param {HttpRequest} req - The HTTP request.
 * @param {teamsfxContext} TeamsfxContext - The context generated by teamsfx binding.
 */
export default async function run(
  context: Context,
  req: HttpRequest,
  teamsfxContext: TeamsfxContext
): Promise<Response> {
  context.log("HTTP trigger function processed a request.");

  // Initialize response.
  const res: Response = {
    status: 200,
    body: {},
  };

  // Put an echo into response body.
  res.body.receivedHTTPRequestBody = req.headers || "";

  // Prepare access token.
  const accessToken: string = teamsfxContext["AccessToken"];
  if (!accessToken) {
    return {
      status: 400,
      body: {
        error: "No access token was found in request header.",
      },
    };
  }

  // Construct teamsfx.
  const oboAuthConfig: OnBehalfOfCredentialAuthConfig = {
    authorityHost: config.authorityHost,
    clientId: config.clientId,
    tenantId: config.tenantId,
    clientSecret: config.clientSecret,
  };

  let oboCredential: OnBehalfOfUserCredential;
  try {
    oboCredential = new OnBehalfOfUserCredential(accessToken, oboAuthConfig);
  } catch (e) {
    context.log.error(e);
    return {
      status: 500,
      body: {
        error:
          "Failed to construct OnBehalfOfUserCredential using your accessToken. " +
          "Ensure your function app is configured with the right Azure AD App registration.",
      },
    };
  }

  try {
    // do sth here, to call activity notification api
    const graphClient_userId: Client = await createMicrosoftGraphClientWithCredential(
      oboCredential,
      ["User.Read"]
    );
    const userProfile = await graphClient_userId.api("/me").get();
    const userId = userProfile["id"];
    // get installationId
    const installationId = await getInstallationId(userId);
    let postbody = {
      topic: {
        source: "entityUrl",
        value:
          "https://graph.microsoft.com/v1.0/users/" +
          userId +
          "/teamwork/installedApps/" +
          installationId,
      },
      activityType: "taskCreated",
      previewText: {
        content: "Task Created",
      },
    };

    let teamsfx_app: TeamsFx;
    teamsfx_app = new TeamsFx(IdentityType.App);
    const graphClient: Client = createMicrosoftGraphClient(teamsfx_app, [".default"]);
    await graphClient.api("users/" + userId + "/teamwork/sendActivityNotification").post(postbody);
  } catch (e) {
    console.log(e);
  }

  return res;
}
