import React, { useEffect, useState } from "react";
import { useApi, SessionState } from "@backstage/core-plugin-api";
import { AuthCardComponent } from "../AuthCardComponent";
import { daytonaAuthApiRef } from "../../definitions";
import { WorkspaceOverviewContent } from "./WorkspaceOverviewContent";

export const WorkspaceOverviewCard = () => {
  const daytonaAuthApi = useApi(daytonaAuthApiRef);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize state based on session storage
    return window.sessionStorage.getItem('isDaytonaSignedIn') === 'true';
  });

  useEffect(() => {
    const authSubscription = daytonaAuthApi.sessionState$().subscribe(state => {
      if (state === SessionState.SignedIn) {
        setIsLoggedIn(true);
        window.sessionStorage.setItem('isDaytonaSignedIn', 'true');
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => {
      authSubscription.unsubscribe();
    };
  }, [daytonaAuthApi]);

  return (
    <>
      {isLoggedIn ? <WorkspaceOverviewContent /> : <AuthCardComponent />}
    </>
  );
}
