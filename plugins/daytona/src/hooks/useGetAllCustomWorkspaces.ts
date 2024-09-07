import { useApi } from "@backstage/core-plugin-api";
import { CustomWorkspaceList } from "../types";
import { daytonaApiRef } from "../api";
import { useAsyncRetry } from "react-use";

export function useGetAllCustomWorkspaces(): {
    workspaceList?: CustomWorkspaceList;
    loading: boolean;
    error?: Error;
    retry: () => void;
} {
    const api = useApi(daytonaApiRef);
    const { value, loading, error, retry } = useAsyncRetry(() => {
        return api.getAllCustomWorkspaces();
    }, [api]);

    const workspaces = value?.flatMap(workspaceList => {
        return workspaceList.items;
    });

    const workspaceList: CustomWorkspaceList = {
        items: workspaces!,
        total: workspaces?.length!,
    }

    return {
        workspaceList,
        loading,
        error,
        retry,
    };
}