import { GitContext, GitStatus } from "./git";
import { Team } from "./team";

export enum ClassName {
    "small",
    "medium",
    "large"
}

export const enum State {
    none            = "none",
    initializing    = "initializing",
    pendingArchive  = "pendingArchive",
    archiving       = "archiving",
    archived        = "archived",
    pendingCreate   = "pendingCreate",
    creating        = "creating",
    created         = "created",
    pendingRestore  = "pendingRestore",
    restoring       = "restoring",
    restored        = "restored",
    pendingStop     = "pendingStop",
    stopping        = "stopping",
    stopped         = "stopped",
    pendingStart    = "pendingStart",
    starting        = "starting",
    started         = "started",
    pendingDestroy  = "pendingDestroy",
    destroying      = "destroying",
    destroyed       = "destroyed",
    error           = "error",
}

export type WorkspaceFileStatus = {
    
    /**
     * Original location of the file, when the file has been moved
     */
    from: string;

    /**
     * First digit of the status code of the file, e.g. 'M' = modified. 
     * Represents the status of the index if no merge conflicts
     */
    index: string;

    /**
     * Path of the file
     */
    path: string;

    /**
     * Second digit of the status code of the file. 
     * Represents status of the working directory if no merge conflicts, 
     * otherwise represents status of other side of a merge.
     */
    workingDir: string;
}

export type WorkspaceInstance = {

    className: ClassName;

    clusterId: string;

    createdAt: string;

    id: string;

    lastKeepAliveSignal: string;

    state: State;

    token: string;

    updatedAt: string;

    version: number;

}

export type Workspace = {

    createdAt: string;

    createdFromTemplate: boolean;

    destroyed: boolean;

    gitContext: GitContext;

    gitStatus: GitStatus;

    id: string;

    pinned: boolean;

    shared: boolean;

    teamId: string;

    updatedAt: string;

    userId: string;

    version: number;

    workspaceInstance: WorkspaceInstance;

}

export type WorkspaceList = {

    items: Workspace[];

    total: number;
}

export type WorkspaceListWithTeam = {

    workspaceList: WorkspaceList,

    team: Team,
}