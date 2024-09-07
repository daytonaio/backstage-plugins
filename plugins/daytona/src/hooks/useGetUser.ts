import { useApi } from "@backstage/core-plugin-api";
import { daytonaApiRef } from "../api";
import useAsync from "react-use/esm/useAsync";
import { User } from "../types";

export function useGetUser(): {
    value?: User,
    loading: boolean,
    error?: Error,
} {
    const api = useApi(daytonaApiRef);
    const { value, loading, error } = useAsync(() => {
        return api.getUser();
    }, [api]);

    return {
        value,
        loading,
        error
    }
}