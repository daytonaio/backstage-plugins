import { Entity } from '@backstage/catalog-model';
import { useApi } from "@backstage/core-plugin-api";
import { WorkspaceList } from "../types";
import { daytonaApiRef } from "../api";
import useAsync from "react-use/esm/useAsync";
import { useRepoUrlFromEntity } from './useRepoUrlFromEntity';

export function useGetWorkspacesForTeamInRepo(
    entity: Entity,
    teamId: string,
): {
    value?: WorkspaceList;
    loading: boolean;
    error?: Error;
} {
    const api = useApi(daytonaApiRef);
    const repoUrl: string = useRepoUrlFromEntity(entity);

    const { value, loading, error } = useAsync(() => {
        return api.getWorkspacesForTeamInRepo(teamId, repoUrl);
    }, [api]);

    return {
        value,
        loading,
        error,
    };

}