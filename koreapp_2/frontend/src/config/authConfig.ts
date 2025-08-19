import { Configuration, PublicClientApplication } from '@azure/msal-browser'

const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || 'your-client-id',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID || 'your-tenant-id'}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
}

export const msalInstance = new PublicClientApplication(msalConfig)

export const loginRequest = {
  scopes: ['User.Read', 'openid', 'profile'],
}

export const graphRequest = {
  scopes: ['User.Read', 'Mail.Read', 'Files.ReadWrite.All', 'Calendars.ReadWrite'],
}
