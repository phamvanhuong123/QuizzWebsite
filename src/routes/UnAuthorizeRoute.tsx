import type { User } from "@/types/user.types"
import { Navigate, Outlet } from "react-router"

const UnauthorizedRoute = () => {
  const user : User = JSON.parse(localStorage.getItem('user')!)
  if (user) return <Navigate replace={true} to={'/home'} />
  return <Outlet/>
}
export default UnauthorizedRoute