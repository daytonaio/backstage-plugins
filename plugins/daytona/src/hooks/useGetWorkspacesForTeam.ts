import { useApi } from "@backstage/core-plugin-api";
import { WorkspaceList } from "../types";
import { daytonaApiRef } from "../api";
import useAsync from "react-use/esm/useAsync";

export function useGetWorkspacesForTeam(teamId: string): {
    value?: WorkspaceList;
    loading: boolean;
    error?: Error;
} {
    const api = useApi(daytonaApiRef);

    const { value, loading, error } = useAsync(() => {
        return api.getWorkspacesForTeam(teamId);
    }, [api]);

    return {
        value,
        loading,
        error,
    };

}