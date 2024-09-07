import { Link } from "@backstage/core-components";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import React from "react";

/**
 * Returns the Git status view of the Codespace compared the reference branch
 * in the format of ahead/behind
 * @param props - the argument with ahead and behind value
 * @returns a React JSX element with Commit Status in the format ahead/behind
 */
export const createWorkspaceUrl = (daytonaHost: string) => {

  const url = `https://${daytonaHost}/create`;
  
  return (
    <>
      <Link
        to={`${url}`}
        target="_blank"
        rel="noopener">
        <AddCircleOutline />
      </Link>
    </>
  );
};
