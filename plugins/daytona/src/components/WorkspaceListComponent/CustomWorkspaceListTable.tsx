import React from "react";
import { Link, ResponseErrorPanel, Table, TableColumn } from "@backstage/core-components";
import { CustomWorkspace, CustomWorkspaceList } from "../../types";
import { LinearProgress, Typography } from "@material-ui/core";
import { getGitStatusView, getRepoUrl, getWorkspaceState, getWorkspaceUrl } from "../../utils";
import { configApiRef, useApi } from "@backstage/core-plugin-api";
import DaytonaIcon from "../../assets/DaytonaIcon";

const columns: TableColumn[] = [
    {
        title: 'Workspace',
        field: 'id',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => getWorkspaceUrl({
            name: row.workspace?.id,
            domain: row.domain,
        })
    },
    {
        title: 'Team',
        field: 'team',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => row.teamName,
    },
    {
        title: 'Repository',
        field: 'branch',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => getRepoUrl({
            repo: row.workspace?.gitContext?.repo,
            webUrl: row.workspace?.gitContext?.webUrl,
        })
    },
    {
        title: 'Current Branch',
        field: 'cuurentBranch',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => row.workspace?.gitStatus?.current,
    },
    {
        title: 'Ahead/Behind',
        field: 'gitStatus',
        width: 'auto',
        render: (row: Partial<CustomWorkspace>) => getGitStatusView({
            ahead: row.workspace?.gitStatus?.ahead,
            behind: row.workspace?.gitStatus?.behind,
        })
    },
    {
        title: 'State',
        field: 'state',
        width: 'auto',
        cellStyle: { whiteSpace: 'nowrap' },
        render: (row: Partial<CustomWorkspace>) => getWorkspaceState({
            status: row.workspace?.workspaceInstance?.state,
        }),
    },
];

type CustomWorkspaceListTableProps = {

    /**
     * Team Details for the title
     */
    team?: string;

    /**
     * List of filtered Workspaces with all the details
     */
    data?: CustomWorkspaceList;

    /**
     * Loading status of the React Hook
     */
    loading: boolean;

    /**
     * Error details of the React Hook
     */
    error?: Error;

    /**
     * Retry mechanism for the React Hook
     * @returns void
     */
    retry: () => void;
}

export const CustomWorkspaceListTable = ({ data, loading, error }: CustomWorkspaceListTableProps) => {

    const config = useApi(configApiRef)
    const daytonaHost = config.getString('daytona.domain');
    const url = `https://${daytonaHost}/create`;

    if (error) {
        return (
            <div>
                <ResponseErrorPanel title={error.message} error={error} />
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <LinearProgress/>
                <div style={{ display: 'block', textAlign: 'center', padding: '10%' }}>
                    <DaytonaIcon />
                    <Typography variant="body1" style={{ display: 'block', wordWrap: "break-word" }}>
                        <span style={{ display: 'block', textAlign: 'center' }}>
                            Searching Daytona Workspaces.
                        </span>
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <>
            {!data?.total ? (
                <div style={{ display: 'block', textAlign: 'center', padding: '10%' }}>
                    <DaytonaIcon />
                    <Typography variant="body1" style={{ display: 'block', wordWrap: "break-word" }}>
                        <span style={{ display: 'block', textAlign: 'center' }}>
                            This component has Daytona Workspaces enabled, but no workspaces were found.
                        </span>
                    </Typography>
                    <Typography variant="body2">
                        <Link to={`${url}`} >
                        Create a new Daytona Workspace
                        </Link>
                    </Typography>
                </div>
            ) : (
            <Table
                isLoading={loading}
                columns={columns}
                options={{
                    search: true,
                    paging: false,
                    pageSize: 5,
                    maxBodyHeight: '60vh',
                    showEmptyDataSourceMessage: !loading,
                }}
                title={
                    <>List ({data?.total})</>
                }
                data={data?.items ?? []}
            />
            )}
        </>
    );
};