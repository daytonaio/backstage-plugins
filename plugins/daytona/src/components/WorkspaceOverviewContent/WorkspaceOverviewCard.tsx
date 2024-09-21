import React, { useEffect, useState } from "react";
import { useApi, SessionState } from "@backstage/core-plugin-api";
import { AuthCardComponent } from "../AuthCardComponent";
import { daytonaAuthApiRef } from "@adityasinghal26/daytona-web";
import { WorkspaceOverviewContent } from "./WorkspaceOverviewContent";

export const WorkspaceOverviewCard = () => {
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
    
    return (
      <>
      {isLoggedIn ? <WorkspaceOverviewContent /> : <AuthCardComponent />}
      </>
    );
}