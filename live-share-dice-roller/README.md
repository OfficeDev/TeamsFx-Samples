---
page_type: sample
languages:
- typescript
products:
- office-teams
- office
name: Dice Roller in meeting
urlFragment: officedev-teamsfx-samples-tab-live-share-dice-roller
description: This sample introduces Microsoft Live Share and Azure Fluid Relay to enable a shared experience between multiple users.
extensions:
  createdDate: "2023-04-27"
---
# Dice Roller - Live Share sample

This repository contains a simple app that enables all connected clients to roll a dice and view the result. For a
walkthrough of this example and how it works, check out the [tutorial documentation](https://aka.ms/fluid/tutorial).

## Requirements

- [Node.js](https://nodejs.org/), supported versions: 16, 18
- An M365 account. If you do not have M365 account, apply one from [M365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
- [Teams Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) version 5.0.0 and higher or [TeamsFx CLI](https://aka.ms/teams-toolkit-cli)

## Run the app locally

- In Visual Studio Code: Start debugging the project by hitting the `F5` key in your keyboard. 
  - Alternatively open the `Run and Debug Activity` panel(Ctrl+Shift+D) in Visual Studio Code and click the `Run and Debug` green arrow button.
- The Teams web client will launch in your browser, click the small arrow sit aside the `Add` button and select `Add to a meeting`, then select the meeting you just created. 
- Click `Set up a tab` in the next step, it will take you to the meeting configuration page.
- In the configuration page, click `Save`, this may take several minutes, and then you will see the meeting chat tab.
- Click `Join` to join the meeting.
- Select the tab in the bar, you will see a side panel tab in the meeting.

## Deploy the app to Azure

Deploy your project to Azure by following these steps:

- Open Teams Toolkit in Visual Studio Code, and sign in your Azure account by clicking the `Sign in to Azure` in the `ACCOUNTS` section from sidebar.
- After you signed in, select a subscription under your account. The Teams Toolkit will use this subscription to provision Azure resources to host you app.
- Open the Teams Toolkit and click `Provision` in the `LIFECYLE` section.
  - Alternatively open the command palette(Ctrl+Shift+P) and type: `Teams: Provision` command.
- Open the Teams Toolkit and click `Deploy` in the `LIFECYLE` section.
  - Alternatively open the command palette(Ctrl+Shift+P) and type: `Teams: Deploy` command.

> Note: Provision Azure cloud resources and deploy to Azure may cause charges to your Azure Subscription.

## Preview the app in Teams client

After you have completed the provision and deploy steps in `Deploy the app to Azure` section, you can preview your app in Teams client by following steps below:

- In Visual Studio Code

  1. Open the `Run and Debug Activity` panel from sidebar, or use short key Ctrl+Shift+D.
  1. Select `Launch Remote (Edge)` or `Launch Remote (Chrome)` in the launch configuration (a dropdown selection in the upper-left corner).
  1. Press the `Start Debugging` (small green arrow) button to launch your app, the Teams web client will be automatically opened in your browser, where you will see your app running remotely from Azure.

## Test it out

1. Schedule a meeting for testing from calendar in Teams.
2. Join the meeting and click the dice roller tab.
3. That's it! You should now see dice-roller on the meeting stage.
    ![image](https://user-images.githubusercontent.com/7799064/168399633-be29ec2b-55db-49ad-a90d-a1011baa8eaa.png)
4. Your friends/colleagues invited to the meeting should be able to see your app on stage when they join the meeting.
