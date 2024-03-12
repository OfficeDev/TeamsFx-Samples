---
page_type: sample
languages:
- typescript
products:
- office-teams
- office
name: Todo List with backend on Azure
urlFragment: officedev-teamsfx-samples-tab-todo-list-with-Azure-backend
description: Todo List app with Azure Function backend and Azure SQL database.
extensions:
  createdDate: "2021-05-06"
---
# Getting Started with Todo List

Todo List provides an easy way to manage to-do items in Teams Client. This app helps enabling task collaboration and management for your team. The frontend is a React app and the backend is hosted on Azure. You will need an Azure subscription to run the app.

![Todo Item List](assets/sampleDemo.gif)

> Note: This sample will only provision [single tenant](https://learn.microsoft.com/azure/active-directory/develop/single-and-multi-tenant-apps#who-can-sign-in-to-your-app) Azure Active Directory app. For multi-tenant support, please refer to this [wiki](https://aka.ms/teamsfx-multi-tenant).

## This sample illustrates

- How to use TeamsFx to build frontend hosting on Azure for your tab app.
- How to use TeamsFx to build backend hosting on Azure for your tab app.
- How to connect to Azure SQL DB and how to do CRUD operations in DB.
- How to use MS graph client in TeamsFx to get access to Microsoft 365 data.
- How to use TeamsFx simple auth capability to get Teams user login information.

## Prerequisite to use this sample
- [Node.js](https://nodejs.org/), supported versions: 16, 18
- A Microsoft 365 account. If you do not have Microsoft 365 account, apply one from [Microsoft 365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
- [Teams Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit) version 5.0.0 and higher or [TeamsFx CLI](https://aka.ms/teams-toolkit-cli)
- An [Azure subscription](https://azure.microsoft.com/en-us/free/)

## Minimal path to awesome

### Run the app locally
To debug the project, you will need to configure an Azure SQL Database to be used locally:
1. [Create an Azure SQL Database](https://docs.microsoft.com/en-us/azure/azure-sql/database/single-database-create-quickstart?tabs=azure-portal)
1. [Add IP address of your computer into allowlist of firewall of Azure SQL Server](https://docs.microsoft.com/en-us/azure/azure-sql/database/firewall-configure#from-the-database-overview-page)
1. Use [query editor](https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-query-portal) with below query to create a table:
    ```sql
    CREATE TABLE Todo
    (
        id INT IDENTITY PRIMARY KEY,
        description NVARCHAR(128) NOT NULL,
        objectId NVARCHAR(36),
        channelOrChatId NVARCHAR(128),
        isCompleted TinyInt NOT NULL default 0,
    )
    ```
1. Open **env/.env.local.user** file, and set the values of below config with the Azure SQL Database you just created:
    ```
    SQL_ENDPOINT=
    SQL_DATABASE_NAME=
    SQL_USER_NAME=
    SQL_PASSWORD=
    ```
1. Open Debug View (`Ctrl+Shift+D`) and select "Debug in Teams (Edge)" or "Debug in Teams (Chrome)" in dropdown list.
1. Press "F5" to open a browser window and then select your package to view todo list sample app.

### Deploy the app to Azure

>Here are the instructions to run the sample in **Visual Studio Code**. You can also try to run the app using TeamsFx CLI tool, refer to [Try the Sample with TeamsFx CLI](cli.md)

1. Clone the repo to your local workspace or directly download the source code.
1. Download [Visual Studio Code](https://code.visualstudio.com) and install [Teams Toolkit Visual Studio Code Extension](https://aka.ms/teams-toolkit).
1. Open the project in Visual Studio Code.
1. Open **env/.env.dev.user** file, set value for `SQL_USER_NAME` and `SQL_PASSWORD`
1. Open the command palette and select `Teams: Provision`. You will be asked to input admin name and password of SQL. The toolkit will help you to provision Azure SQL.
1. Once provision is completed, open the command palette and select `Teams: Deploy`.
1. Open **env/.env.dev** file, you could get the database name in `PROVISIONOUTPUT__AZURESQLOUTPUT__DATABASENAME` output. [Set IP address of your computer into server-level IP firewall rule from the database overview page](https://docs.microsoft.com/en-us/azure/azure-sql/database/firewall-configure#from-the-database-overview-page).
1. In Azure portal, find the database by `databaseName` and use [query editor](https://docs.microsoft.com/en-us/azure/azure-sql/database/connect-query-portal) with below query to create a table:
    ```sql
    CREATE TABLE Todo
    (
        id INT IDENTITY PRIMARY KEY,
        description NVARCHAR(128) NOT NULL,
        objectId NVARCHAR(36),
        channelOrChatId NVARCHAR(128),
        isCompleted TinyInt NOT NULL default 0,
    )
    ```

### Preview the app in Teams
1. Once deployment is completed, you can preview the app running in Azure. In Visual Studio Code, open `Run and Debug` and select `Launch Remote (Edge)` or `Launch Remote (Chrome)` in the dropdown list and Press `F5` or green arrow button to open a browser.

#### Usage of this sample
1. The app will look like this when it runs for the first time.

    ![Todo List](images/StartPage.jpg)
1. For the first time to run the app, you need to consent the app to get your profile information like your avatar. Click on "Accept" button to accept the Authorization.

    ![Todo List](images/Consent.jpg)
1. You could try to add new todo item by typing item by clicking "Add task" button.
1. You could try to complete todo item by choosing the checkbox before the item.
1. You could try to update todo item by typing text in todo item list.
1. You could try to delete todo item by clicking "..." and then choose "delete" button.

## Version History
|Date| Author| Comments|
|---|---|---|
| Mar 10, 2022 | junhan | update to support Teams Toolkit v4.0.0 |
| Mar 21, 2023 | junhan | update to support Teams Toolkit v5.0.0 |

## Feedback
We really appreciate your feedback! If you encounter any issue or error, please report issues to us following the [Supporting Guide](https://github.com/OfficeDev/TeamsFx-Samples/blob/dev/SUPPORT.md). Meanwhile you can make [recording](https://aka.ms/teamsfx-record) of your journey with our product, they really make the product better. Thank you!