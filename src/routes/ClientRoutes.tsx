import { Navigate, Route, Routes } from "react-router";
import Auth from "../pages/Auth/Auth";

function ClientRoutes(){
    return <Routes>
        <Route path="/" element={<Navigate to={'/login'}/>}/>
        <Route path="/login" element={<Auth/>} />
        <Route path="/register" element={<Auth/>} />
        <Route/>
    </Routes>
}

export default ClientRoutes