<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/daytonaio/daytona/raw/main/assets/images/Daytona-logotype-white.png">
    <img alt="Daytona logo" src="https://github.com/daytonaio/daytona/raw/main/assets/images/Daytona-logotype-black.png" width="40%">
  </picture>
</div>

<br />

<div align="center">

[![Issues - daytona](https://img.shields.io/github/issues/daytonaio/backstage-plugins)](https://github.com/daytonaio/backstage-plugins/issues)

</div>

<h1 align="center">Daytona Backstage Plugins</h1>

<div align="center">
This repository is the home of the <a href="https://github.com/daytonaio/daytona">Daytona</a> Backstage Plugins.
</div>

</br>

<p align="center">
  <a href="https://github.com/daytonaio/backstage-plugins/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%F0%9F%90%9B+Bug+Report%3A+">Report Bug</a>
    ·
  <a href="https://github.com/daytonaio/backstage-plugins/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=%F0%9F%9A%80+Feature%3A+">Request Feature</a>
    ·
  <a href="https://go.daytona.io/slack">Join Our Slack</a>
    ·
  <a href="https://twitter.com/Daytonaio">Twitter</a>
</p>

## Plugins Overview

To integrate Daytona plugins into your existing Backstage instance, install the following plugins:

1. [@daytonaio/backstage-plugin-auth-backend-module-daytona-provider](https://www.npmjs.com/package/@daytonaio/backstage-plugin-auth-backend-module-daytona-provider)
2. [@daytonaio/daytona-web](https://www.npmjs.com/package/@daytonaio/daytona-web)
3. [@daytonaio/backstage-plugin-daytona](https://www.npmjs.com/package/@daytonaio/backstage-plugin-daytona)

### Daytona Plugin

The Daytona plugin provides frontend components to connect to the Daytona API backend and view the workspaces for the authenticated user. You can create new Daytona workspaces directly from Backstage.

#### Features

- Authenticates users with Daytona Keycloak.
- Displays a list of all workspaces for the authenticated user.
- Shows workspaces of a specific repository with proper annotations.
- Allows users to create new workspaces by navigating to the Daytona instance.

#### Installation

The package shall be installed in the Backstage root directory as below.

```sh
yarn --cwd packages/app add @daytonaio/backstage-plugin-daytona
```

#### Setup

1. Install the plugin dependency in your Backstage app package:

```sh
# From your Backstage root directory
yarn add --cwd packages/app @daytonaio/backstage-plugin-daytona
```

2. Add to the app `EntityPage` component. Make sure to add `DaytonaOverviewComponent` right after `EntityAboutCard` under `overviewContent`. This will get the repository URL automatically from the entity location metadata to create the Daytona Workspaces. Along with that, it will also list all the Workspaces, specific to the repository.

```typescript
import { DaytonaOverviewContent } from '@daytonaio/backstage-plugin-daytona';

// Add the DaytonaOverviewContent to show the workspaces for that entity
const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    <Grid item md={6}>
      <EntityAboutCard variant="gridItem" />
    </Grid>
    <Grid item md={6}>
      <DaytonaOverviewContent />
    </Grid>
    {/* other grid items here*/}
  </Grid>
);
```

3. Annotate your component with a valid Git repository if you wish to override the automatically configured repository URL for creating Daytona Workspaces.

The annotation key is `daytona.io/repo-url`.

Example:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: backstage
  description: backstage.io
  annotations:
    daytona.io/repo-url: https://github.com/daytonaio-templates/go
spec:
  type: website
  lifecycle: production
  owner: user:guest
```

### Daytona Web Plugin

The plugin provides the frontend components required for Daytona Authentication (`daytonaApiFactory`) and Sign-In (`daytonaSignInProvider`). These components will ease the implementation for Daytona authentication using OAuth in Backstage.

#### Features

- Provides `daytonaApiFactory` for Daytona authentication.
- Includes `daytonaSignInProvider` to support Daytona OAuth sign-in.

#### Installation

Install the package via Yarn in your Backstage root directory:

```sh
# From your Backstage root directory
yarn --cwd packages/app add @daytonaio/daytona-web
```

#### Authentication Setup

Backstage requires ApiFactory to interact with Daytona OAuth library and a sign-in provider. Follow the below steps:

1. In Backstage folder `packages/app/src`, add the below snippet in `apis.ts` file.

```typescript
// In packages/app/src/apis.ts
import { daytonaApiFactory } from '@daytonaio/daytona-web';

// Add the Daytona ApiFactory to the list of available APIs
export const apis: AnyApiFactory[] = [
    {/* other ApiFactory here */}
    daytonaApiFactory
];
```

2. Add the following to Backstage `App.tsx` file.

```typescript
// In packages/app/src/App.tsx
import { daytonaSignInProvider } from '@daytonaio/daytona-web';

// Add the Daytona Sign-In Provider to the available sign-in providers
const app = createApp({
    {/* other api, bind routes here */}
    components: {
        SignInPage: props => <SignInPage {...props} auto providers={['guest',daytonaSignInProvider]} />,
    },
});
```
