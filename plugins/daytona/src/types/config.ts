import { ConfigApi, OAuthApi } from '@backstage/core-plugin-api';

/**
 * An object to handle the input type for the plugin  
 */
export type Options = {
    /**
     * API to get the details of Daytona Auth 
     */
    daytonaAuthApi: OAuthApi;
    /**
     * API to get the root config details
     */
    configApi: ConfigApi;
}

export type DaytonaConfig = {
    apiBaseUrl: string,
}

export type InstanceConfig = {
    name: string;
    password?: string;
    token?: string;
    url: string;
    username?: string;
};