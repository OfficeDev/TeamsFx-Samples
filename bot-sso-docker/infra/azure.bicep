@maxLength(20)
@minLength(4)
@description('Used to generate names for all resources in this file')
param resourceBaseName string

@description('Required when create Azure Bot service')
param botAadAppClientId string

@secure()
@description('Required by Bot Framework package in your bot project')
param botAadAppClientSecret string

@maxLength(42)
param botDisplayName string

@description('Required by SSO flow')
param aadAppClientId string
param aadAppTenantId string
param aadAppOauthAuthorityHost string
@secure()
param aadAppClientSecret string

@description('Specifies the docker container image to deploy.')
param containerImage string = 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'

@description('Minimum number of replicas that will be deployed')
@minValue(0)
@maxValue(25)
param minReplica int = 1

@description('Maximum number of replicas that will be deployed')
@minValue(0)
@maxValue(25)
param maxReplica int = 3

var location = resourceGroup().location

module acr 'containerRegistry.bicep' = {
  name: 'acr'
  params: {
    containerRegistryName: resourceBaseName
  }
}

resource containerAppEnv 'Microsoft.App/managedEnvironments@2023-05-01' = {
  name: resourceBaseName
  location: location
  properties: {}
}

resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: resourceBaseName
  location: location
  properties: {
    managedEnvironmentId: containerAppEnv.id
    configuration: {
      secrets: [
        {
          name: 'bot-id'
          value: botAadAppClientId
        }
        {
          name: 'bot-password'
          value: botAadAppClientSecret
        }
        {
          name: 'aad-app-client-id'
          value: aadAppClientId
        }
        {
          name: 'aad-app-client-secret'
          value: aadAppClientSecret
        }
        {
          name: 'aad-app-tenant-id'
          value: aadAppTenantId
        }
        {
          name: 'aad-app-oauth-authority-host'
          value: aadAppOauthAuthorityHost
        }
      ]
      ingress: {
        external: true
        targetPort: 80
        allowInsecure: false
        traffic: [
          {
            latestRevision: true
            weight: 100
          }
        ]
      }
    }
    template: {
      containers: [
        {
          name: resourceBaseName
          image: containerImage 
          resources: {
            cpu: json('.25')
            memory: '.5Gi'
          }
        }
      ]
      scale: {
        minReplicas: minReplica
        maxReplicas: maxReplica
        rules: [
          {
            name: 'http-requests'
            http: {
              metadata: {
                concurrentRequests: '10'
              }
            }
          }
        ]
      }
    }
  }
}

// Register your web service as a bot with the Bot Framework
module azureBotRegistration './botRegistration/azurebot.bicep' = {
  name: 'Azure-Bot-registration'
  params: {
    resourceBaseName: resourceBaseName
    botAadAppClientId: botAadAppClientId
    botAppDomain: containerApp.properties.configuration.ingress.fqdn
    botDisplayName: botDisplayName
  }
}

output AZURE_CONTAINER_APP_NAME string = containerApp.name
output AZURE_CONTAINER_APPFQDN string = containerApp.properties.configuration.ingress.fqdn
output BOT_DOMAIN string = containerApp.properties.configuration.ingress.fqdn
