import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Content,
  TabbedLayout,
} from '@backstage/core-components';
import { WorkspaceListCard } from '../WorkspaceListComponent';
import { AdminCard } from '../AdminCard';
import { useAccessToken } from '../../hooks';

export const WorkspaceComponent = () => {
  const userApiRoles = useAccessToken().apiRoles;
  const isAdmin = userApiRoles.includes('admin') || userApiRoles.includes('user-admin');

  const adminContent = (
    <TabbedLayout>
      <TabbedLayout.Route path='workspaces' title="Workspaces">
          <Grid container spacing={3} direction="column">
            <Grid item>
              <WorkspaceListCard />
            </Grid>
          </Grid>
      </TabbedLayout.Route>
      <TabbedLayout.Route path='admin' title="Admin">
          <Grid container spacing={3} direction="column">
            <Grid item>
              <AdminCard />
            </Grid>
          </Grid>
      </TabbedLayout.Route>
    </TabbedLayout>
  );

  const nonAdminContent = (
    <Content>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <WorkspaceListCard />
        </Grid>
      </Grid>
    </Content>
  );

  return (
    <>
      { isAdmin ? adminContent : nonAdminContent }
    </>
  )
}