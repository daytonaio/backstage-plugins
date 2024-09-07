import React, { useEffect } from "react";
import { useGetCustomWorkspacesForTeam, useGetTeam } from "../../hooks";
import { CustomWorkspaceListTable } from "./CustomWorkspaceListTable";
import { errorApiRef, useApi } from "@backstage/core-plugin-api";

export const WorkspaceListComponentTeam = () => {
    const teamId: string = '5c2aaeeb-5088-4e79-9ab1-5d4324968a60';
    const team = useGetTeam(teamId);
    const errorApi = useApi(errorApiRef);
    const { value, loading, error, retry } = useGetCustomWorkspacesForTeam(teamId);

    useEffect(() => {
        if(error) {
            errorApi.post(error);
        }
    },[error, errorApi]);

    return <CustomWorkspaceListTable retry={retry} team={team.value?.name} data={value} loading={loading} error={error} />;
}