import React, { useState } from "react";
import { useApi } from "@backstage/core-plugin-api";
import { Box, Button, Card, CardContent, CardHeader, Divider, ListItemText, Typography } from "@material-ui/core";
import DaytonaIcon from "../../assets/DaytonaIcon";
import { daytonaAuthApiRef } from "@adityasinghal26/daytona-web";
import { isError } from '@backstage/errors';

export const AuthCardComponent = () => {
    const daytonaAuthApi = useApi(daytonaAuthApiRef);
    const [error, setError] = useState<string>();

    const handleAuthenticate = async () => {
        try {
            await daytonaAuthApi.signIn();
        } catch (e) {
            setError(isError(e) ? e.message : 'An unspecified error occurred');
        } 
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
                }/>
            <Divider />
            <CardContent style={{ padding: 0, overflow: 'auto', display: 'block' }}>
                <div style={{ display: 'block', textAlign: 'center', padding: '10%' }}>
                    <DaytonaIcon />
                    <Typography variant="body1" style={{ display: 'block', wordWrap: "break-word" }}>
                        <span style={{ display: 'block', textAlign: 'center' }}>
                            Link your Daytona account to create and manage workspaces.
                        </span>
                    </Typography>
                    <div style={{padding: '3%', }}>
                        <Button variant="contained" color="primary" onClick={handleAuthenticate}>
                                Authenticate
                        </Button>
                        <ListItemText
                            primary={error && <Typography color="error">{error}</Typography>}
                        />
                    </div>
                </div>
                
            </CardContent>
        </Card>
    );
}