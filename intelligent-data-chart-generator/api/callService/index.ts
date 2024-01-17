/* This code sample provides a starter kit to implement server side logic for your Teams App in TypeScript,
 * refer to https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference for complete Azure Functions
 * developer guide.
 */

import { Context, HttpRequest } from "@azure/functions";
import {
  ApiKeyLocation,
  ApiKeyProvider,
  AxiosInstance,
  createApiClient,
} from "@microsoft/teamsfx";

import config from "../config";
import sqlExample from "../example/sqlExample.json";
import sqlPrompt from "../prompt/sqlPrompt";

// Define a Response interface with a status number and a body object that can contain any key-value pairs.
interface Response {
  status: number;
  body: { [key: string]: any };
}

// Define an Example interface with a content string and a role string.
interface Example {
  content: string;
  role: string;
}

/**
 * This function is the entry point for the Azure Function.
 * It handles HTTP requests from the Teams client and calls the appropriate function based on the request parameters.
 *
 * @param {Context} context - The Azure Functions context object.
 * @param {HttpRequest} req - The HTTP request.
 * @returns {Promise<Response>} - A promise that resolves with the HTTP response.
 */
export default async function run(
  context: Context,
  req: HttpRequest
): Promise<Response> {
  // Initialize response.
  const res: Response = {
    status: 200,
    body: {},
  };

  // Put an echo into response body.
  res.body.receivedHTTPRequestBody = req.body || "";

  // Prepare access token.
  const accessToken: string = req.get("Authorization")
    ?.replace("Bearer ", "")
    .trim();
  if (!accessToken) {
    return {
      status: 400,
      body: {
        error: "No access token was found in request header.",
      },
    };
  }

  // Get request data from the HTTP request.
  const reqData = req.body;

  try {
    const result = await handleRequest(reqData);
    res.body = { ...res.body, ...result };
  } catch (e) {
    context.log.error(e);
    return {
      status: 500,
      body: {
        error: "Failed to process request.",
      },
    };
  }

  return res;
}

/**
 * Handles the request.
 *
 * @param {any} reqData - The request data to use (if applicable).
 * @returns {Promise<any>} - A promise that resolves with the result of the request.
 */
async function handleRequest(reqData: any): Promise<any> {
  // Call the OpenAI API to get SQL autocompletion suggestions.
  const aiResponse = await sqlCompletion(reqData.question);
  const parsedResponse = JSON.parse(aiResponse);
  return {
    queryResult: await queryDB(parsedResponse.sql),
    sqlString: parsedResponse.sql,
    xKey: parsedResponse.xKey,
    yKey: parsedResponse.yKey,
  };
}

/**
 * Provides autocompletion suggestions for SQL queries.
 * @param body The SQL query to provide suggestions for.
 * @returns A list of autocompletion suggestions.
 */
async function sqlCompletion(body: string): Promise<string> {
  const completionResp = await callOpenAI(
    constructRquest(body, sqlPrompt, sqlExample)
  );
  return completionResp.message.content;
}

/**
 * Constructs a request object for the OpenAI API.
 * @param userInput The user's input.
 * @param prompt The prompt to use.
 * @param example The example to use.
 * @returns
 */
function constructRquest(userInput: string, prompt: string, example: any[]) {
  return {
    messages: [
      {
        content: prompt,
        role: "system",
      },
      ...getExample(example),
      {
        content: userInput,
        role: "user",
      },
    ],
  };
}

/**
 * Converts the example data into a list of examples for the OpenAI API.
 * @param exampleData The example data to convert.
 * @returns A list of examples for the OpenAI API.
 */
function getExample(exampleData: any[]): Example[] {
  const examples: Example[] = [];
  exampleData.forEach((item) => {
    examples.push({
      content: item.request,
      role: "user",
    });
    examples.push({
      content: JSON.stringify(item.response),
      role: "assistant",
    });
  });
  return examples;
}

/**
 * Calls the OpenAI API with the provided request object.
 * @param request - The request object to be sent to the OpenAI API.
 * @returns The response object from the OpenAI API.
 */
async function callOpenAI(request: any) {
  const authProvider = new ApiKeyProvider(
    "api-key",
    config.openAIApiKey,
    ApiKeyLocation.Header
  );
  const apiClient: AxiosInstance = createApiClient(
    `${config.openAIEndpoint}openai/deployments/${config.openAIDeploymentName}`,
    authProvider
  );
  const resp = await apiClient.post(config.chatCompletionUrl, request);
  if (resp.status !== 200) {
    throw new Error(`Failed to call OpenAI API. Status code: ${resp.status}`);
  }

  const response = resp.data.choices[0];
  return response;
}

/**
 * Executes a SQL query using the provided SQL string.
 * @param {string} sqlStr - The SQL query string to execute.
 * @returns {Promise<any>} - A Promise that resolves with the result set of the query.
 */
async function queryDB(sqlStr: string): Promise<any> {
  const sqlConfig = {
    user: config.sqlUser,
    password: config.sqlPassword,
    server: config.sqlServer,
    database: config.sqlDatabase,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };
  try {
    var poolConnection = await require("mssql").connect(sqlConfig);
    var resultSet = await poolConnection.request().query(sqlStr);
    return resultSet.recordset;
  } catch (err) {
    console.error(err);
  } finally {
    // Release resources.
    poolConnection.close();
  }
}
