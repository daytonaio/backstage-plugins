import { useApi } from "@backstage/core-plugin-api";
import { CustomWorkspaceList } from "../types";
import { daytonaApiRef } from "../api";
import { useAsyncRetry } from "react-use";

export function useGetCustomWorkspacesForTeam(teamId: string): {
    value?: CustomWorkspaceList;
    loading: boolean;
    error?: Error;
    retry: () => void;
} {
    const api = useApi(daytonaApiRef);

    const { value, loading, error, retry } = useAsyncRetry(() => {
        return api.getCustomWorkspacesForTeam(teamId);
    }, [api]);

    return {
        value,
        loading,
        error,
        retry,
    };

}