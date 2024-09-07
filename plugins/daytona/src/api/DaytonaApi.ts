import { createApiRef } from "@backstage/core-plugin-api";
import { CustomWorkspaceList, GitContext, Team, User, WorkspaceList, WorkspaceListWithTeam } from "../types";


/** 
 * An API service to use Github Codespaces within Backstage
 * 
 * @public
 *  */
export const daytonaApiRef = createApiRef<DaytonaApi>({
    id: 'plugin.daytona.service',
});

/** 
 * A client object for fetching information about Github Codespaces
 * 
 * @public */
export type DaytonaApi = {

    createGitRepositoryContext: (repoUrl: string) => Promise<GitContext>

    getTeam: (teamId: string) => Promise<Team>
    
    getTeams: () => Promise<Team[]>

    getUser: () => Promise<User>

    getWorkspacesForTeam: (teamId: string) => Promise<WorkspaceList>

    getCustomWorkspacesForTeam: (teamId: string) => Promise<CustomWorkspaceList>

    getCustomWorkspacesForTeamInRepo: (teamId: string, repoUrl: string) => Promise<CustomWorkspaceList>

    getWorkspacesWithTeam: (teamId: string) => Promise<WorkspaceListWithTeam>

    getAllWorkspaces: () => Promise<WorkspaceList[]>

    getAllCustomWorkspaces: () => Promise<CustomWorkspaceList[]>

    getAllCustomWorkspacesInRepo: (repoUrl: string) => Promise<CustomWorkspaceList[]>

    getAllWorkspacesWithTeam: () => Promise<WorkspaceListWithTeam[]>

    getWorkspacesForTeamInRepo: (teamId: string, repoUrl: string) => Promise<WorkspaceList>

}