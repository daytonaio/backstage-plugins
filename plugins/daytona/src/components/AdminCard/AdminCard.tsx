import React from "react";
import { AdminCardComponent } from "./AdminCardComponent";
import { useAccessToken } from "../../hooks";

export const AdminCard = () => {
    const userApiRoles = useAccessToken().apiRoles;
    
    return (
        <>
            <AdminCardComponent 
                isOwner={userApiRoles.includes('owner') || userApiRoles.includes('admin')} 
                isUserAdmin={userApiRoles.includes('user-admin')} />
        </>
    )
}