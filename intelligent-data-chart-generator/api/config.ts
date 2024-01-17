const config = {
  teamsAppId: process.env.TEAMS_APP_ID,
  authorityHost: process.env.M365_AUTHORITY_HOST,
  tenantId: process.env.M365_TENANT_ID,
  clientId: process.env.M365_CLIENT_ID,
  clientSecret: process.env.M365_CLIENT_SECRET,
  openAIEndpoint: process.env.OPENAI_ENDPOINT,
  openAIDeploymentName: process.env.OPENAI_DEPLOYMENT_NAME,
  openAIApiKey: process.env.OPENAI_API_KEY,
  chatCompletionUrl: process.env.OPENAI_CHAT_COMPLETION_URL,
  sqlUser: process.env.SQL_USER,
  sqlPassword: process.env.SQL_PASSWORD,
  sqlServer: process.env.SQL_SERVER,
  sqlDatabase: process.env.SQL_DATABASE,
};

export default config;
