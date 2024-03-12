# Getting Started with Hello World Bot with Tab

A bot, chatbot, or conversational bot is an application that responds to simple commands sent in a chat and provides meaningful replies. The interaction with a bot can be a quick question and answer or a complex conversation.

This is a simple "Hello World" application that has both Bot and Tab capabilities. The bot sends a welcome message when a new member is added, while the tab displays a welcome page.

## This sample illustrates

- How to use Teams Toolkit to create a Teams app with both Bot and Tab capabilities.

## Prerequisites

- [Node.js](https://nodejs.org/), supported versions: 16, 18
- An M365 account. If you do not have M365 account, apply one from [M365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
- [Teams Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) version 5.0.0 and higher or [TeamsFx CLI](https://aka.ms/teams-toolkit-cli)

## Minimal path to awesome

### Run the app locally

- From VS Code:
    1. hit `F5` to start debugging. Alternatively open the `Run and Debug Activity` Panel and select `Debug in Teams (Edge)` or `Debug in Teams (Chrome)`.

- From TeamsFx CLI:
    1. Install [dev tunnel cli](https://aka.ms/teamsfx-install-dev-tunnel).
    1. Login with your M365 Account using the command `devtunnel user login`.
    1. Start your local tunnel service by running the command `devtunnel host -p 3978 --protocol http --allow-anonymous`.
    1. In the `env/.env.local` file, fill in the values for `BOT_DOMAIN` and `BOT_ENDPOINT` with your dev tunnel URL.
       ```
       BOT_DOMAIN=sample-id-3978.devtunnels.ms
       BOT_ENDPOINT=https://sample-id-3978.devtunnels.ms
       ```
    1. Run command: `teamsapp provision --env local` .
    1. Run command: `teamsapp deploy --env local` .
    1. Run command: `teamsapp preview --env local` .

### Deploy the app to Azure

- From VS Code:
    1. Sign into Azure by clicking the `Sign in to Azure` under the `ACCOUNTS` section from sidebar.
    1. Click `Provision` from `LIFECYCLE` section or open the command palette and select: `Teams: Provision`.
    1. Click `Deploy` or open the command palette and select: `Teams: Deploy`.

- From TeamsFx CLI:
    1. Run command: `teamsapp auth login azure`.
    1. Run command: `teamsapp provision --env dev`.
    1. Run command: `teamsapp deploy --env dev`.

### Preview the app in Teams

- From VS Code:
    1. Open the `Run and Debug Activity` Panel. Select `Launch Remote (Edge)` or `Launch Remote (Chrome)` from the launch configuration drop-down.

- From TeamsFx CLI:
    1. Run command: `teamsapp preview --env dev`.

## Advanced usage of this sample

### Add Single Sign On feature

Microsoft Teams provides a mechanism by which an application can obtain the signed-in Teams user token to access Microsoft Graph (and other APIs). Teams Toolkit facilitates this interaction by abstracting some of the Azure Active Directory (AAD) flows and integrations behind some simple, high-level APIs. This enables you to add single sign-on (SSO) features easily to your Teams application.

Please follow this [document](https://aka.ms/teamsfx-add-sso) to add single sign on for your project.

## Version History

|Date| Author| Comments|
|---|---|---|
|Dec 9, 2022| hund030 | Onboard sample in Teams Toolkit V5.0.0|

## Feedback
We really appreciate your feedback! If you encounter any issue or error, please report issues to us following the [Supporting Guide](https://github.com/OfficeDev/TeamsFx-Samples/blob/dev/SUPPORT.md). Meanwhile you can make [recording](https://aka.ms/teamsfx-record) of your journey with our product, they really make the product better. Thank you!