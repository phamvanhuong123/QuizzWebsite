import { Navigate, Outlet } from "react-router"

function PrivateRoute(){
    const user = localStorage.getItem('user')
    if(!user) return <Navigate to={'/login'}/>

    return <Outlet/>

}
export default PrivateRoute