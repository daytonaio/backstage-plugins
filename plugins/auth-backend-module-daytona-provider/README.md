# @daytona-io/backstage-plugin-auth-backend-module-daytona-provider

The daytona-provider backend module for the auth plugin.

_This plugin was created through the Backstage CLI_

## Description

The package provides Backstage module to implement authentication via `auth` plugin. It uses OIDC for authentication with Daytona Keycloak to directly authenticate the user from Daytona and login with any of the two common sign-in resolvers.

- `emailMatchingUserEntityProfileEmail`: To match the user email with the Backstage user profile email
- `emailLocalPartMatchingUserEntityName`: To match the local part of the user email with the Backstage user profile email. Suppose, if the user email is `example@daytonaio`, then a Backstage user profile with the name `example` must exist. Refer [examples/org.yaml](../../examples/org.yaml) for a test implementation.

## Configuration

The Daytona module configuration will be under `auth` in `app-config.yaml` as below.

```yaml
auth:
  session:
    secret: dummy
  environment: production
  # see https://backstage.io/docs/auth/ to learn about auth providers
  providers:
    # See https://backstage.io/docs/auth/guest/provider
    daytona:
      production:
        clientId: <daytona-client-id>
        clientSecret: <daytona-client-secret>
        metadataUrl: https://id.<your-daytona-domain>/realms/default/.well-known/openid-configuration
        prompt: auto
        signIn:
          resolvers:
            - resolver: emailLocalPartMatchingUserEntityName
```

In the above configuration, below are the options need to be handled.
- `auth.session.secret` must be provided as required in Backstage authentication.
- add `daytona` under the `auth.providers` section, where multiple environments can be configured and then referred in `auth.environment`.
- add your Daytona Backstage client ID and secret. If you're using the provided `backstage.json`, then your client ID will be `backstage` in `default` realm and secret can be fetched by logging to `https://id.<your-daytona-domain>`.
- sign-in resolvers can be as provided, either `emailMatchingUserEntityProfileEmail` or `emailLocalPartMatchingUserEntityName`.

## Installation and Setup

The plugin can be installed by running the below command in Backstage root directory and later, adding the following in your Backstage backend.

```sh
# From your Backstage root directory
yarn --cwd packages/backend add @daytona-io/backstage-plugin-auth-backend-module-daytona-provider
```

```ts
// In packages/backend/src/index.ts

// Add the Daytona auth plugin provider
backend.add(import('@daytona-io/backstage-plugin-auth-backend-module-daytona-provider'));
```
