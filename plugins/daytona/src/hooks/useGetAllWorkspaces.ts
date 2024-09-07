import { useApi } from "@backstage/core-plugin-api";
import { WorkspaceList } from "../types";
import { daytonaApiRef } from "../api";
import useAsync from "react-use/esm/useAsync";

export function useGetAllWorkspaces(): {
    workspaceList?: WorkspaceList;
    loading: boolean;
    error?: Error;
} {
    const api = useApi(daytonaApiRef);
    const { value, loading, error } = useAsync(() => {
        return api.getAllWorkspaces();
    }, [api]);

    const workspaces = value?.flatMap(workspaceList => {
        return workspaceList.items;
    });

    const workspaceList: WorkspaceList = {
        items: workspaces!,
        total: workspaces?.length!,
    }

    return {
        workspaceList,
        loading,
        error,
    };
}