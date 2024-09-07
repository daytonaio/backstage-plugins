import { useApi } from "@backstage/core-plugin-api";
import { daytonaApiRef } from "../api";
import useAsync from "react-use/esm/useAsync";
import { Team } from "../types";

export function useGetTeam(teamId: string): {
    value?: Team,
    loading: boolean,
    error?: Error,
} {
    const api = useApi(daytonaApiRef);
    const { value, loading, error } = useAsync(() => {
        return api.getTeam(teamId);
    }, [api]);

    return {
        value,
        loading,
        error
    }
}