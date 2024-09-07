import React from "react";

/**
 * Returns the Git status view of the Codespace compared the reference branch
 * in the format of ahead/behind
 * @param props - the argument with ahead and behind value
 * @returns a React JSX element with Commit Status in the format ahead/behind
 */
export const getGitStatus = (props: {
    ahead?: number;
    behind?: number;
}) => {
  if(props.ahead === undefined || props.behind === undefined) return null;
  return (
    <>
      {getGitStatusView(props)}
    </>
  );
};

/**
* Returns the Git status of the Codespace compared the reference branch
* in the format of ahead/behind
* where, ahead - number of commits the Codespace is ahead of the reference branch
* and, behind - number of commits the Codespace is behind of the reference branch
* @param props - the argument with ahead and behind value
* @returns the value with Commit Status in the format ahead/behind
*/
export function getGitStatusView({
  ahead,
  behind
}: {
  ahead?: number;
  behind?: number;
}) {
  if (ahead === undefined || behind === undefined) return null;
  const answer = `${ahead}/${behind}`;
  return answer;
}
