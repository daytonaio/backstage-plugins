import { useApi } from "@backstage/core-plugin-api";
import { daytonaAuthApiRef } from "../definitions";
import { useAsyncRetry } from "react-use";

export function useAccessToken(): {
    token: string;
    apiRoles: string[];
    loading: boolean;
    error?: Error;
    retry: () => void;
} {
    const api = useApi(daytonaAuthApiRef);
    const { value, loading, error, retry } = useAsyncRetry(() => {
        return api.getAccessToken();
    }, [api]);

    let token: any = null;
    let apiRoles: string[] = [];
    if(value) {
        const base64Url = value.split('.')[1];
        const base64Payload = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64Payload).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        token = JSON.parse(jsonPayload);
        apiRoles = token.resource_access['api'].roles;
    }

    return {
        token,
        apiRoles,
        loading,
        error,
        retry
    }
}