import { WorkspaceFileStatus } from "./workspace";

export type GitStatus = {

    ahead: number;

    behind: number;

    current: string;

    detached: boolean;

    files: WorkspaceFileStatus;

    tracking: string;
}

export type GitContext = {

    /**
     * The clone url of the repository
     */
    cloneUrl: string,

    /**
     * Has devcontainer config
     */
    hasDevContainerConfig: boolean,

    /**
     * The owner of the repository
     */
    owner: string,

    /**
     * The id of the git provider
     */
    providerId: string,

    /**
     * The name of the repository
     */
    repo: string,
    
    /**
     * The current commit sha of the repository
     */
    sha: string,

    /**
     * The source of the repository
     */
    source: string,

    /**
     * The web url of the repository
     */
    webUrl: string
}