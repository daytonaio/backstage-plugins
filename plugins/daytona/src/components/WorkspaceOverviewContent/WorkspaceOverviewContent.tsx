import React, { useEffect } from "react";
import { useGetAllCustomWorkspacesInRepo } from "../../hooks";
import { useEntity } from '@backstage/plugin-catalog-react';
import { CustomWorkspaceOverviewTable } from "./CustomWorkspaceOverviewTable";
import { alertApiRef, configApiRef, errorApiRef, useApi } from "@backstage/core-plugin-api";
import { Box, Card, CardContent, CardHeader, Divider, IconButton, Tooltip } from "@material-ui/core";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import SyncIcon from '@material-ui/icons/Sync';
import DaytonaIcon from "../../assets/DaytonaIcon";

export const WorkspaceOverviewContent = () => {
    const { entity } = useEntity();
    const errorApi = useApi(errorApiRef);
    const { repoUrl, value, loading, error, retry } = useGetAllCustomWorkspacesInRepo(entity);

    useEffect(() => {
        if(error) {
            errorApi.post(error);
        }
    },[error, errorApi]);

    const config = useApi(configApiRef);
    const daytonaHost = config.getString('daytona.domain');
    const createUrl = `https://${daytonaHost}/#${repoUrl}`;

    const openInNewTab = (url: string): void => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const alertApi = useApi(alertApiRef);
    const refresh = () => {
        retry();
        alertApi.post({
            message: 'Syncing Workspaces', 
            severity: 'info', 
            display: 'transient' 
        });
    }

    return (
        <Card style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 10px)', // for pages without content header
            marginBottom: '10px',
          }}>
            <CardHeader 
                title={
                    <>
                        <Box display="flex" alignItems="center" marginBottom={2}>
                            <DaytonaIcon/> 
                            <Box mr={1} width={2}/>
                            Daytona Workspaces
                        </Box>  
                    </>
                }
                action={
                <>
                    <Tooltip title="Create Workspace">
                        <IconButton
                            aria-label="Create"
                            onClick={() => openInNewTab(`${createUrl}`)}
                        >
                            <AddCircleOutline />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Sync Workspaces">
                        <IconButton
                            aria-label="Refresh"
                            onClick={refresh}
                        >
                            <SyncIcon />
                        </IconButton>
                    </Tooltip>
                </>
                }/>
            <Divider />
            <CardContent style={{ padding: 0, overflow: 'auto', display: 'block' }}>
                <CustomWorkspaceOverviewTable retry={retry} repo={repoUrl} createUrl={createUrl} data={value} loading={loading} error={error} />
            </CardContent>
        </Card>
    );
}