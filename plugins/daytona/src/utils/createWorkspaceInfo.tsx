import { Box, Button, Link, Tooltip } from "@material-ui/core";
import React from "react";
import { getGitStatus } from "./getGitStatus";
import { State } from "../types";
import { getWorkspaceState } from "./getWorkspaceState";

/**
 * Returns the Git status view of the Codespace compared the reference branch
 * in the format of ahead/behind
 * @param props - the argument with ahead and behind value
 * @returns a React JSX element with Commit Status in the format ahead/behind
 */
export const createWorkspaceInfo = (props: {
    name?: string;
    domain?: string;
    team?: string;
    branch?: string;
    ahead?: number;
    behind?: number;
    status?: State;
}) => {
  const { name, branch, ahead, behind, status } = props;
  const aheadBehind = getGitStatus({ahead, behind});
  const statusIndicator = getWorkspaceState({status});
  
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      {/* <div style={{padding: '1%', fontSize: '0.9vw',}}>{team}</div> */}
      <div>
        <Box alignItems="center">
          <div style={{padding: '1%', fontSize: '1vw'}}>{name}</div>
          <span style={{display: 'flex', fontSize: '0.8vw', marginTop: '1%', marginLeft: 'auto'}}>
            <div style={{padding: '1%', margin: '1%'}}>{statusIndicator}</div>
            <div style={{padding: '1%', margin: '1%'}}>{branch}</div>
            <div style={{padding: '1%', margin: '1%'}}>{aheadBehind}</div>
          </span>
        </Box>
      </div>
    </div>
  );
};

export const getWorkspaceOpenButton = (props: {
    name?: string;
    domain?: string;
}) => {
    const { name, domain } = props;
    const openUrl = `https://${name}.${domain}`;

    const openInNewTab = (url: string): void => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }

    return (
        <div>
          <Tooltip placement="top" arrow title="Open">
            <Button
              variant="outlined"
              color="primary"
              // Calling getAccessToken instead of a plain signIn because we are going to get the correct scopes right away. No need to second request
              onClick={() => openInNewTab(`${openUrl}`)}
            >
              Open
            </Button>
          </Tooltip>
        </div>
    );
}

/**
* Returns the Git status of the Codespace compared the reference branch
* in the format of ahead/behind
* where, ahead - number of commits the Codespace is ahead of the reference branch
* and, behind - number of commits the Codespace is behind of the reference branch
* @param props - the argument with ahead and behind value
* @returns the value with Commit Status in the format ahead/behind
*/
export function loadUrl({
    name,
    url
  }: {
    name?: string;
    url?: string;
  }) {
      const urlObject = url ? (
          <Link
            href={`${url}`}
            target="_blank"
            rel="noopener">
            {name}
          </Link>
        ) : (name);
  
      return urlObject;
  }
  