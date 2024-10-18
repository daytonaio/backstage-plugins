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

    /**
     * Whether the current user is an user-admin
     */
    isUserAdmin: boolean;
}

export const AdminCardComponent = ({ isOwner, isUserAdmin }: AdminCardComponentProps) => (
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
                {isUserAdmin && (
                    <Grid item md={4}>
                        <AdminTabCard name="Users" desc="Manage users" path='users'/>
                    </Grid>
                )}
                {isOwner && (
                    <>
                        <Grid item md={4}>
                            <AdminTabCard name="Users" desc="Manage users and their roles" path='users'/>
                        </Grid>
                        <Grid item md={4}>
                            <AdminTabCard name="Teams" desc="Manage teams and their applied quotas" path='teams'/>
                        </Grid>
                        <Grid item md={4}>
                            <AdminTabCard name="Quotas" desc="Manage resource limits with quotas" path='quotas'/>
                        </Grid>
                        <Grid item md={4}>
                            <AdminTabCard name="Workspace Classes" desc="Manage workspace resources with workspace classes" path='workspace-classes'/>
                        </Grid>
                        <Grid item md={4}>
                            <AdminTabCard name="Identity Providers" desc="Manage authentication providers for Daytona" path='identity-providers'/>
                        </Grid>
                        <Grid item md={4}>
                            <AdminTabCard name="Settings" desc="Manage global settings in Daytona" path='settings'/>
                        </Grid>
                        <Grid item md={4}>
                            <AdminTabCard name="License" desc="Manage your Daytona license" path='license'/>
                        </Grid>
                    </>
                )}
            </Grid>
        </CardContent>
    </Card>
);

