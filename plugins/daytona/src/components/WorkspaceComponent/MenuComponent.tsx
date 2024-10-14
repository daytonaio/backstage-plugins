import React, { useEffect, useState } from "react";
import { useApi, SessionState } from "@backstage/core-plugin-api";
import { AuthCardComponent } from "../AuthCardComponent/AuthCardComponent";
import { daytonaAuthApiRef } from "../../definitions";
import { Content, Header, HeaderLabel, Page } from "@backstage/core-components";
import { Grid } from "@material-ui/core";
import { WorkspaceComponent } from "./WorkspaceComponent";

export const MenuComponentContent = () => {
  const daytonaAuthApi = useApi(daytonaAuthApiRef);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize state based on session storage
    return window.sessionStorage.getItem('isDaytonaSignedIn') === 'true';
  });
  // window.sessionStorage.setItem('isDaytonaSignedIn', 'false');
  // const isDaytonaSignedIn = window.sessionStorage.getItem('isDaytonaSignedIn') == 'true';

  useEffect(() => {
    const authSubscription = daytonaAuthApi.sessionState$().subscribe(state => {
      console.log('isDaytonaSignedIn inside useEffect', state);
      if (state === SessionState.SignedIn) {
        setIsLoggedIn(true);
        window.sessionStorage.setItem('isDaytonaSignedIn', 'true');
        console.log('isDaytonaSignedIn inside if-block', window.sessionStorage.getItem('isDaytonaSignedIn') == 'true');
      } else {
        setIsLoggedIn(false);
        window.sessionStorage.setItem('isDaytonaSignedIn', 'false');
      }
    });
    return () => {
      authSubscription.unsubscribe();
    };
  }, [daytonaAuthApi]);

  // const isDaytonaSignedIn = window.sessionStorage.getItem('isDaytonaSignedIn') == 'true';
  console.log('isDaytonaSignedIn after useEffect', window.sessionStorage.getItem('isDaytonaSignedIn') == 'true');

  const authConent = (
    <Content>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <AuthCardComponent />
        </Grid>
      </Grid>
    </Content>
  )

  return (
    <>
      {isLoggedIn ? <WorkspaceComponent /> : authConent}
    </>
  );
}

export const MenuComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to Daytona!">
      <HeaderLabel label="Owner" value="Daytona" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <MenuComponentContent />
  </Page>
);

