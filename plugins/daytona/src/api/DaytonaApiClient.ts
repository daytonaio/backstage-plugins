import { DaytonaApi } from "./DaytonaApi";
import { CustomWorkspace, CustomWorkspaceList, GitContext, Options, Team, User, WorkspaceList, WorkspaceListWithTeam } from "../types";
import { DaytonaSdkClient } from "./DaytonaSdkClient";

/**
 * An API client for fetching information about
 * Github Codespaces implementing githubCodespacesApiRef
 * 
 * @public
 */
export class DaytonaApiClient implements DaytonaApi {

    private readonly client: DaytonaSdkClient;

    constructor(options: Options) {
        this.client = new DaytonaSdkClient(options);
    }

    private async getDaytona<T = any>(apiEndpoint: string, init?: RequestInit): Promise<T> {
        const daytonaClient = this.client.fetch<T>(`${apiEndpoint}`, init);
        return daytonaClient;

    }

    async createGitRepositoryContext(repoUrl: string): Promise<GitContext> {
        const data = {
            gitRepositoryUrl: repoUrl,
        }
        const requestInit = {
            method: "POST",
            body: JSON.stringify(data),
        }
        const gitContext = await this.getDaytona<GitContext>(`/workspace/git-context`, requestInit);
        return gitContext;
    }

    async getWorkspacesForTeam(teamId: string): Promise<WorkspaceList> {
        const workspaceList = await this.getDaytona<WorkspaceList>(`/workspace?teamId=${teamId}`);
        return workspaceList;
    }

    async getCustomWorkspacesForTeam(teamId: string): Promise<CustomWorkspaceList> {
        const workspaceList = await this.getWorkspacesForTeam(teamId);
        const teamName = (await this.getTeam(teamId)).name;
        const domain = await this.client.getDomain();
        const customWorkspaces: CustomWorkspace[] = workspaceList.items.map(workspace => {
            const customWorkspace = { workspace, teamName, domain };
            return customWorkspace;
        })
        const customWorkspaceList = { items: customWorkspaces, total: workspaceList.total };
        return customWorkspaceList;
    }

    async getCustomWorkspacesForTeamInRepo(teamId: string, repoUrl: string): Promise<CustomWorkspaceList> {
        const workspaceList = await this.getWorkspacesForTeam(teamId);
        const teamName = (await this.getTeam(teamId)).name;
        const domain = await this.client.getDomain();
        const customWorkspaces: CustomWorkspace[] = workspaceList.items.map(workspace => {
            const customWorkspace = { workspace, teamName, domain };
            return customWorkspace;
        })
        const filteredCustomWorkspaces = customWorkspaces.filter((customWorkspace) => {
            return (customWorkspace.workspace.gitContext.webUrl === repoUrl);
        }); 
        const customWorkspaceList = { items: filteredCustomWorkspaces, total: workspaceList.total };
        return customWorkspaceList;
    }

    async getWorkspacesWithTeam(teamId: string): Promise<WorkspaceListWithTeam>{
        const workspaceList = await this.getWorkspacesForTeam(teamId);
        const team = await this.getTeam(teamId);
        return { workspaceList, team };
    }

    async getAllWorkspaces(): Promise<WorkspaceList[]> {
        const teams = await this.getTeams();
        const teamIDs = teams.map(team => team.id);
        const allWorkspaceLists = teamIDs.map(teamId => 
            this.getWorkspacesForTeam(teamId)
        )
        return Promise.all(allWorkspaceLists);
    }

    async getAllCustomWorkspaces(): Promise<CustomWorkspaceList[]> {
        const teams = await this.getTeams();
        const teamIDs = teams.map(team => team.id);
        const allCustomWorkspaceLists = teamIDs.map(teamId => 
            this.getCustomWorkspacesForTeam(teamId)
        )
        return Promise.all(allCustomWorkspaceLists); 
    }

    async getAllCustomWorkspacesInRepo(repoUrl: string): Promise<CustomWorkspaceList[]> {
        const teams = await this.getTeams();
        const teamIDs = teams.map(team => team.id);
        const allCustomWorkspaceLists = teamIDs.map(teamId => 
            this.getCustomWorkspacesForTeamInRepo(teamId, repoUrl)
        )
        return Promise.all(allCustomWorkspaceLists); 
    }

    async getAllWorkspacesWithTeam(): Promise<WorkspaceListWithTeam[]> {
        const teams = await this.getTeams();
        const teamIDs = teams.map(team => team.id);
        const allWorkspaceLists = teamIDs.map(teamId => 
            this.getWorkspacesWithTeam(teamId)
        )
        return Promise.all(allWorkspaceLists);
    }

    async getWorkspacesForTeamInRepo(teamId: string, repoUrl: string): Promise<WorkspaceList> {
        const workspaceList = await this.getDaytona<WorkspaceList>(`/workspace?teamId=${teamId}`);
        const filteredWorkspaces = workspaceList.items.filter((workspace) => {
            return (workspace.gitContext.webUrl === repoUrl);
        });
        const filteredWorkspaceList = {
            items: filteredWorkspaces,
            total: filteredWorkspaces.length,
        }
        return filteredWorkspaceList;
    }

    async getTeams(): Promise<Team[]> {
        const teams = await this.getDaytona<Team[]>(`/team`);
        return teams;
    }

    async getTeam(teamId: string): Promise<Team> {
        const team = await this.getDaytona<Team>(`/team/${teamId}`);
        return team;
    }

    async getUser(): Promise<User> {
        const user = await this.getDaytona<User>(`/user`);
        return user;
    }


}