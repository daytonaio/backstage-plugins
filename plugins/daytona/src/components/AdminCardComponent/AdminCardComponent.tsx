import React from 'react';
import { Box, Divider, Grid } from '@material-ui/core';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { AdminMenuCard } from './AdminMenuCard';
import { DaytonaIcon } from '../../assets';

export const AdminCardComponent = () => (
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
                    <AdminMenuCard name="Users" desc="Manage Daytona Users" path='users'/>
                </Grid>
                <Grid item md={4}>
                    <AdminMenuCard name="Teams" desc="Manage Daytona Users" path='teams'/>
                </Grid>
                <Grid item md={4}>
                    <AdminMenuCard name="Quotas" desc="Set User Quotas" path='quotas'/>
                </Grid>
                <Grid item md={4}>
                    <AdminMenuCard name="Workspace Classes" desc="Define Workspace Classes" path='workspace-classes'/>
                </Grid>
                <Grid item md={4}>
                    <AdminMenuCard name="Identity Providers" desc="Add Identity or Git providers" path='identity-providers'/>
                </Grid>
                <Grid item md={4}>
                    <AdminMenuCard name="Settings" desc="Other Daytona Settings" path='settings'/>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

