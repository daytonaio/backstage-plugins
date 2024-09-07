import React from "react";
import { ResponseErrorPanel, Table, TableColumn } from "@backstage/core-components";
import { Workspace, WorkspaceList } from "../../types";
import { Box } from "@material-ui/core";
import { getGitStatusView, getRepoUrl, getWorkspaceState } from "../../utils";
import DaytonaIcon from "../../assets/DaytonaIcon";

const columns: TableColumn[] = [
    {
        title: 'Workspace',
        field: 'id',
        width: 'auto',
    },
    {
        title: 'Repository',
        field: 'branch',
        width: 'auto',
        render: (row: Partial<Workspace>) => getRepoUrl({
            repo: row.gitContext?.repo,
            webUrl: row.gitContext?.webUrl,
        })
    },
    {
        title: 'Current Branch',
        field: 'cuurentBranch',
        width: 'auto',
        render: (row: Partial<Workspace>) => row.gitStatus?.current,
    },
    {
        title: 'Ahead/Behind',
        field: 'gitStatus',
        width: 'auto',
        render: (row: Partial<Workspace>) => getGitStatusView({
            ahead: row.gitStatus?.ahead,
            behind: row.gitStatus?.behind,
        })
    },
    {
        title: 'State',
        field: 'state',
        width: 'auto',
        render: (row: Partial<Workspace>) => getWorkspaceState({
            status: row.workspaceInstance?.state,
        }),
    },
];

type WorkspacesOverviewTableProps = {

    /**
     * List of filtered Workspaces with all the details
     */
    data?: WorkspaceList;

    /**
     * Loading status of the React Hook
     */
    loading: boolean;

    /**
     * Error details of the React Hook
     */
    error?: Error;
}

export const WorkspacesOverviewTable = ({ data, loading, error}: WorkspacesOverviewTableProps) => {
    if (error) {
        return (
            <div>
                <ResponseErrorPanel error={error}/>
            </div>
        );
    }

    return (
        <Table
            isLoading={loading}
            columns={columns}
            options={{
                search: true,
                paging: true,
                pageSize: 5,
                showEmptyDataSourceMessage: !loading,
            }}
            title={
                <Box display="flex" alignItems="center">
                    <DaytonaIcon/>
                    <Box mr={1} />
                    Daytona Workspaces - List ({data?.total})
                </Box>
            }
            data={data?.items ?? []}
        />
    );
};