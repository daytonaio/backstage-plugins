# @daytonaio/daytona-web

_This package was created through the Backstage CLI_.

## Description

The plugin provides the frontend components required for Daytona Authentication (`daytonaApiFactory`) and Sign-In (`daytonaSignInProvider`). These components will ease the implementation for Daytona authentication using OAuth in Backstage.

## Installation

Install the package via Yarn in your Backstage root directory:

```sh
# From your Backstage root directory
yarn --cwd packages/app add @daytonaio/daytona-web
```

## Authentication Setup

Backstage requires ApiFactory to interact with Daytona OAuth library and a sign-in provider. Follow the below steps:

1. In Backstage folder `packages/app/src`, add the below snippet in `apis.ts` file.

    ```ts
    // In packages/app/src/apis.ts
    import { daytonaApiFactory } from '@daytonaio/daytona-web';

    // Add the Daytona ApiFactory to the list of available APIs
    export const apis: AnyApiFactory[] = [
        {/* other ApiFactory here */}
        daytonaApiFactory
    ];
    ```

2. Add the following to Backstage `App.tsx` file.

    ```tsx

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
