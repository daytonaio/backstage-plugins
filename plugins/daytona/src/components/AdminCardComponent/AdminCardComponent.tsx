import React from 'react';
import { Box, Divider, Grid } from '@material-ui/core';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { AdminTabCard } from './AdminTabCard';
import { DaytonaIcon } from '../../assets';

type AdminCardComponentProps = {

    /**
     * Whether the current user is an owner
     */
    isOwner: boolean;
}

export const AdminCardComponent = ({ isOwner }: AdminCardComponentProps) => (
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
                            <DaytonaIcon />
                            <Box mr={1} width={2} />
                            Daytona Administration
                        </Box>
                    </>
                } />
            <Divider />
        <CardContent >
            <Grid container spacing={3}>
                <Grid item md={4}>
                    <AdminTabCard name="Users" desc="Manage Daytona Users" path='users'/>
                </Grid>
                {isOwner && (
                    <>
                        <Grid item md={4}>
                            <AdminTabCard name="Teams" desc="Manage Daytona Teams" path='teams'/>
                        </Grid>
                        <Grid item md={4}>
                            <AdminTabCard name="Quotas" desc="Set User Quotas" path='quotas'/>
                        </Grid>
                        <Grid item md={4}>
                            <AdminTabCard name="Workspace Classes" desc="Define Workspace Classes" path='workspace-classes'/>
                        </Grid>
                        <Grid item md={4}>
                            <AdminTabCard name="Identity Providers" desc="Add Identity or Git providers" path='identity-providers'/>
                        </Grid>
                        <Grid item md={4}>
                            <AdminTabCard name="Settings" desc="Other Daytona Settings" path='settings'/>
                        </Grid>
                    </>
                )}
            </Grid>
        </CardContent>
    </Card>
);

