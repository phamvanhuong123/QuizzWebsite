import { rolePermissions } from "@/constants/rolePermission"


export const usePermission = (userRole : string) => {
    const hasPermission = (permission : string) => {
        const allowPermission = rolePermissions[userRole] || []

        return allowPermission.includes(permission)
    }

    return {hasPermission}
}