import * as axios from "axios";

import { BearerTokenAuthProvider, createApiClient } from "@microsoft/teamsfx";

import { TeamsUserCredentialContext } from "../internal/singletonContext";

type Method = axios.Method;

/**
 * Calls an Azure Function with the specified HTTP method, function name, parameters, and data.
 * @param method The HTTP method to use for the request.
 * @param functionName The name of the Azure Function to call.
 * @param params Optional query parameters to include in the request.
 * @param data Optional data to include in the request body.
 * @returns The response data from the Azure Function.
 */
export async function callFunction(
  method: Method,
  functionName: string,
  params?: any,
  data?: any
) {
  // Get the Teams user credential from the singleton context
  const credential = TeamsUserCredentialContext.getInstance().getCredential();
  if (!credential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }

  try {
    // Construct the base URL for the Azure Function API
    const apiBaseUrl = process.env.REACT_APP_FUNC_ENDPOINT + "/api/";

    // Create an Axios instance which uses BearerTokenAuthProvider to inject token to request header
    const apiClient = createApiClient(
      apiBaseUrl,
      new BearerTokenAuthProvider(
        async () => (await credential.getToken(""))!.token
      )
    );

    let response: any;
    // Send the request to the Azure Function API
    response = await apiClient.request({
      method,
      url: functionName,
      params,
      data,
    });

    // Return the response data from the Azure Function
    return response.data;
  } catch (err: unknown) {
    if (axios.default.isAxiosError(err)) {
      let funcErrorMsg = "";

      if (err?.response?.status === 404) {
        funcErrorMsg = `There may be a problem with the deployment of Azure Function App, please deploy Azure Function (Run command palette "Teams: Deploy") first before running this App`;
      } else if (err.message === "Network Error") {
        funcErrorMsg =
          "Cannot call Azure Function due to network error, please check your network connection status and ";
        if (err.config?.url && err.config.url.indexOf("localhost") >= 0) {
          funcErrorMsg += `make sure to start Azure Function locally (Run "npm run start" command inside api folder from terminal) first before running this App`;
        } else {
          funcErrorMsg += `make sure to provision and deploy Azure Function (Run command palette "Teams: Provision" and "Teams: Deploy") first before running this App`;
        }
      } else {
        funcErrorMsg = err.message;
        if (err.response?.data?.error) {
          funcErrorMsg += ": " + err.response.data.error;
        }
      }

      // Throw an error with a message indicating the problem with the Azure Function call
      throw new Error(funcErrorMsg + "\n" + err);
    }

    // Throw the original error if it is not an Axios error
    throw err;
  }
}
