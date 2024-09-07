import React, { useEffect } from "react";
import { useGetAllCustomWorkspaces } from "../../hooks";
import { CustomWorkspaceListTable } from "./CustomWorkspaceListTable";
import { alertApiRef, configApiRef, errorApiRef, useApi } from "@backstage/core-plugin-api";
import { Box, Card, CardContent, CardHeader, Divider, IconButton, Tooltip } from "@material-ui/core";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import SyncIcon from '@material-ui/icons/Sync';
import DaytonaIcon from "../../assets/DaytonaIcon";

export const WorkspaceListComponent = () => {
    const errorApi = useApi(errorApiRef);
    const { workspaceList, loading, error, retry } = useGetAllCustomWorkspaces();

    useEffect(() => {
        if(error) {
            errorApi.post(error);
        }
    },[error, errorApi]);

    const config = useApi(configApiRef);
    const daytonaHost = config.getString('daytona.domain');
    const createUrl = `https://${daytonaHost}/create`;

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
        <Card>
            <CardHeader 
                title={
                    <>
                        <Box display="flex" alignItems="center" >
                            <DaytonaIcon/> 
                            <Box mr={1} width={2}/>
                            Recent Workspaces
                        </Box>  
                    </>
                }
                subheader="List of all the workspaces across All Teams"
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
                <CustomWorkspaceListTable retry={retry} data={workspaceList} loading={loading} error={error} />
            </CardContent>
        </Card>
    );
}