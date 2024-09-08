import {
  configApiRef,
  createApiFactory,
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { DaytonaApiClient, daytonaApiRef } from './api';
import { daytonaAuthApiRef } from '@daytonaio/daytona-web';

export const daytonaPlugin = createPlugin({
  id: 'daytona',
  apis: [
    createApiFactory({
      api: daytonaApiRef,
      deps: { configApi: configApiRef, daytonaAuthApi: daytonaAuthApiRef },
      factory: ({ configApi, daytonaAuthApi }) => new DaytonaApiClient({ configApi, daytonaAuthApi })
    })
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const DaytonaPage = daytonaPlugin.provide(
  createRoutableExtension({
    name: 'DaytonaPage',
    component: () =>
      import('./components/WorkspaceComponent').then(m => m.WorkspaceComponent),
    mountPoint: rootRouteRef,
  }),
);

export const DaytonaOverviewContent = daytonaPlugin.provide(
  createComponentExtension({
    name: 'DaytonaOverviewContent',
    component: {
      lazy: () =>
        import('./components/WorkspaceOverviewContent').then(m => m.WorkspaceOverviewContent),
    }
  })
)
