import { roles } from "@/constants/rolePermission"
import { usePermission } from "@/hooks/usePermission"
import type { User } from "@/types/user.types"
import { Navigate, Outlet } from "react-router"

interface PermissionRouteProps{
    requirePermission : string
}

function PermissionRoute({requirePermission} : PermissionRouteProps){
    const user : User = JSON.parse(localStorage.getItem('user')!)
    const userRole = user.role || roles.USER
    const {hasPermission} = usePermission(userRole)
    
    if(!hasPermission(requirePermission)) return <Navigate to={'/home'} replace={true}/>

    return <Outlet/>
}
export default PermissionRoute