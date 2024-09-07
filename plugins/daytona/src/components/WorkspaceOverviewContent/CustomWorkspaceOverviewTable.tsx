import React from "react";
import { ResponseErrorPanel, Table, TableColumn } from "@backstage/core-components";
import { CustomWorkspace, CustomWorkspaceList } from "../../types";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import { createWorkspaceInfo, getWorkspaceOpenButton } from "../../utils";
import DaytonaIcon from "../../assets/DaytonaIcon";

const columns: TableColumn[] = [
    {
        title: 'Workspace',
        field: 'id',
        width: 'auto',
        cellStyle: { whiteSpace: 'nowrap' },
        render: (row: Partial<CustomWorkspace>) => createWorkspaceInfo({
            name: row.workspace?.id,
            domain: row.domain,
            team: row.teamName,
            branch: row.workspace?.gitStatus?.current,
            ahead: row.workspace?.gitStatus?.ahead,
            behind: row.workspace?.gitStatus?.behind,
            status: row.workspace?.workspaceInstance?.state,
        })
    },
    {
        title: 'Open',
        field: 'Open',
        width: 'auto',
        cellStyle: { whiteSpace: 'nowrap' },
        render: (row: Partial<CustomWorkspace>) => getWorkspaceOpenButton({
            name: row.workspace?.id,
            domain: row.domain,
        })
    },
];

type CustomWorkspaceOverviewTableProps = {

    /**
     * Repository for the component
     */
    repo?: string;

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

    /**
     * Workspace Create URL for the component
     */
    createUrl?: string;
}

export const CustomWorkspaceOverviewTable = ({ repo, data, loading, error, createUrl }: CustomWorkspaceOverviewTableProps) => {

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
                <div style={{ display: 'block', textAlign: 'center', padding: 'calc(10% - 4px)' }}>
                    <DaytonaIcon />
                    <Typography variant="body1" style={{ display: 'block', wordWrap: "break-word" }}>
                        <span style={{ display: 'block', textAlign: 'center' }}>
                            Searching workspaces for repo
                            <code style={{display: 'block', fontSize: '90%'}}>{repo}</code>
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
                            No workspaces found for repo
                            <code style={{display: 'block', fontSize: '90%'}}>{repo}</code>
                        </span>
                        {/* No workspace found for repository
                        <span style={{display: 'block'}}>{repo}</span> */}
                    </Typography>
                    <div style={{padding: '3%', }}>
                        <Button variant="contained" color="primary">
                            <a href={createUrl} target="_blank" rel="noopener noreferer">
                                Create Workspace
                            </a>
                        </Button>
                    </div>
                </div>
            ) : (
            <Table
                isLoading={loading}
                columns={columns}
                options={{
                    search: false,
                    paging: false,
                    pageSize: 5,
                    showTitle: false,
                    header: false,
                    toolbar: false,
                    maxBodyHeight: '40vh',
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