import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  HeaderLabel,
  TabbedLayout,
} from '@backstage/core-components';
import { WorkspaceListCard } from '../WorkspaceListComponent';
import { AdminCardComponent } from '../AdminCardComponent';

export const WorkspaceComponentContent = () => {
  const isAdmin = true

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
              <AdminCardComponent isOwner={false} />
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

export const WorkspaceComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to Daytona!">
      <HeaderLabel label="Owner" value="Daytona" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <WorkspaceComponentContent />
  </Page>
);
