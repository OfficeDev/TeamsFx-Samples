const config = {
  devopsOrgName: process.env.DEVOPS_ORGANIZATION_NAME,
  devopsProjectName: process.env.DEVOPS_PROJECT_NAME,
  devopsAccessToken: process.env.DEVOPS_ACCESS_TOKEN,
  githubAccessToken: process.env.GITHUB_ACCESS_TOKEN,
  githubRepoName: process.env.GITHUB_REPO_NAME,
  githubRepoOwner: process.env.GITHUB_REPO_OWNER,
  plannerGroupId: process.env.PLANNER_GROUP_ID,
  plannerPlanId: process.env.PLANNER_PLAN_ID,
  authorityHost: process.env.M365_AUTHORITY_HOST,
  tenantId: process.env.M365_TENANT_ID,
  clientId: process.env.M365_CLIENT_ID,
  clientSecret: process.env.M365_CLIENT_SECRET,
};

export default config;
