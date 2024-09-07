import { useApi } from "@backstage/core-plugin-api";
import { CustomWorkspaceList } from "../types";
import { daytonaApiRef } from "../api";
import { useAsyncRetry } from "react-use";
import { Entity } from "@backstage/catalog-model";
import { useRepoUrlFromEntity } from "./useRepoUrlFromEntity";

export function useGetAllCustomWorkspacesInRepo(
    entity: Entity,
): {
    repoUrl: string;
    value?: CustomWorkspaceList;
    loading: boolean;
    error?: Error;
    retry: () => void;
} {
    const api = useApi(daytonaApiRef);
    const repoUrl: string = useRepoUrlFromEntity(entity);

    const { value, loading, error, retry } = useAsyncRetry(() => {
        return api.getAllCustomWorkspacesInRepo(repoUrl);
    }, [api]);

    const workspaces = value?.flatMap(workspaceList => {
        return workspaceList.items;
    });

    const workspaceList: CustomWorkspaceList = {
        items: workspaces!,
        total: workspaces?.length!,
    }

    return {
        repoUrl,
        value: workspaceList,
        loading,
        error,
        retry,
    };

}