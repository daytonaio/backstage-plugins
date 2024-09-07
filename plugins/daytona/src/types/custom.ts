import { Workspace } from "./workspace";

export type CustomWorkspace = {

    workspace: Workspace;

    teamName: string;

    domain: string;
}

export type CustomWorkspaceList = {

    items: CustomWorkspace[];

    total: number;
}