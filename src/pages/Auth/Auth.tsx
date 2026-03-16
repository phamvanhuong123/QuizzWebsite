import { useLocation } from "react-router"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

function Auth(){
    const location = useLocation()
    const isLogin = location.pathname === '/login'
    const isRegister = location.pathname === '/register'
    return<>
        {isLogin && <LoginForm/>}
        {isRegister && <RegisterForm/>}
    </>
}
export default Auth