---
page_type: sample
languages:
  - typescript
products:
  - office-teams
name: Containerized Bot App with SSO Enabled
urlFragment: officedev-teamsfx-samples-bot-sso-docker
description: A containerized Microsoft Teams Bot app with SSO
extensions:
  createdDate: "2024-01-17"
---

# Getting Started with Bot SSO in Docker

A bot, chatbot, or conversational bot is an app that responds to simple commands sent in chat and replies in meaningful ways. Examples of bots in everyday use include: bots that notify about build failures, bots that provide information about the weather or bus schedules, or provide travel information. A bot interaction can be a quick question and answer, or it can be a complex conversation. Being a cloud application, a bot can provide valuable and secure access to cloud services and corporate resources.

This is a sample chatbot application running in Docker container. It demonstrates Single Sign-on using `botbuilder` and Teams Framework that can respond to a `show` message.

![Bot SSO Overview](assets/sampleDemo.gif)

## This sample illustrates

- Use Teams Toolkit to create a Teams bot app.
- Use Microsoft Graph to get User info and picture in Teams app.
- Use TeamsFx SDK to implementing SSO for Teams bot.
- Use Docker to containerize a Teams bot.

## Prerequisite to use this sample

- [Docker Engine](https://docs.docker.com/engine/install/)
- A Microsoft 365 tenant in which you have permission to upload Teams apps. You can get a free Microsoft 365 developer tenant by joining the [Microsoft 365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program).
- [Teams Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) version 5.0.0 and higher or [TeamsFx CLI](https://aka.ms/teamsfx-cli)
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) for Azure Container Apps deployment

## Containerization of Teams App

Teams applications can be developed and run locally using containerization, which provides a consistent and isolated environment for testing and deployment. Containerizing your Teams app makes it easier to manage dependencies, scale efficiently, and maintain your app in production. Below are steps and references to help you containerize your Teams app.

### How to containerize

This sample demonstrate how to containerize a Teams App and integrate the Docker container into Teams Toolkit development lifecycle, which can serve as reference for your containerization process.

- **Write a Dockerfile**: Create a Dockerfile that specifies the build instructions for your container image. Refer to this [Dockerfile example](./Dockerfile)

- **Configure Debugging**: Configure `launch.json` and `tasks.json` to run Docker locally for debugging. Refer to this [VS Code launch.json example](./.vscode/launch.json) and [VS Code tasks.json example](./.vscode/tasks.json)

- **Provision Infrastructure**: Automate the provisioning of Azure Container Apps and Azure Container Registry using Bicep templates. Refer to this [Azure Bicep example](./infra/azure.bicep).

- **Build and Deploy to ACA**: Build the Docker image and push it to Azure Container Registry using Docker CLI. Deploy the image to Azure Container Apps using Azure CLI. Refer to the deployment scripts in this [teamsapp.yml example](./teamsapp.yml).

## Minimal path to awesome

### Run the app locally

- From VS Code:
  1. hit `F5` to start debugging. Alternatively open the `Run and Debug Activity` Panel and select `Debug (Edge)` or `Debug (Chrome)`.
- From TeamsFx CLI:
  1.  Install [dev tunnel cli](https://aka.ms/teamsfx-install-dev-tunnel).
  1.  Login with your M365 Account using the command `devtunnel user login`.
  1.  Start your local tunnel service by running the command `devtunnel host -p 3978 --protocol http --allow-anonymous`.
  1.  In the `env/.env.local` file, fill in the values for `BOT_DOMAIN` and `BOT_ENDPOINT` with your dev tunnel URL.
      ```
      BOT_DOMAIN=sample-id-3978.devtunnels.ms
      BOT_ENDPOINT=https://sample-id-3978.devtunnels.ms
      ```
  1.  Run command: `teamsfx provision --env local`.
  1.  Run command: `docker build -t sso-bot .`.
  1.  Run command: `docker run -p 3978:80 --env-file .localConfigs sso-bot`.
  1.  Run command: `teamsfx preview --open-only`.

### Deploy the app to Azure

- From VS Code:
  1. Sign into Azure by clicking the `Sign in to Azure` under the `ACCOUNTS` section from sidebar.
  1. Click `Provision` from `LIFECYCLE` section or open the command palette and select: `Teams: Provision`.
  1. Run command: `az login`.
  1. Click `Deploy` or open the command palette and select: `Teams: Deploy`.
- From TeamsFx CLI:
  1. Run command: `teamsfx account login azure`.
  1. Run command: `teamsfx provision --env dev`.
  1. Run command: `az login`.
  1. Run command: `teamsfx deploy --env dev`.

### Preview the app in Teams

- From VS Code:
  1. Open the `Run and Debug Activity` Panel. Select `Launch Remote (Edge)` or `Launch Remote (Chrome)` from the launch configuration drop-down.
- From TeamsFx CLI:
  1. Run command: `teamsfx preview --env dev`.

## Further reading

- [How Microsoft Teams bots work](https://docs.microsoft.com/azure/bot-service/bot-builder-basics-teams?view=azure-bot-service-4.0&tabs=javascript)
- [Azure Container Apps overview](https://learn.microsoft.com/azure/container-apps/overview)

## Version History

| Date         | Author     | Comments                               |
| ------------ | ---------- | -------------------------------------- |
| Jan 17, 2024  | hund030    | Onboard sample in Teams Toolkit V5.0.0 |

## Feedback

We really appreciate your feedback! If you encounter any issue or error, please report issues to us following the [Supporting Guide](https://github.com/OfficeDev/TeamsFx-Samples/blob/dev/SUPPORT.md). Meanwhile you can make [recording](https://aka.ms/teamsfx-record) of your journey with our product, they really make the product better. Thank you!
