import { Navigate, Route, Routes } from "react-router";
import Auth from "../pages/Auth/Auth";
import Home from "@/pages/Home/Home";
import ResultDetail from "@/pages/ResultDetail/ResultDetail";
import Quiz from "@/pages/Quiz/Quiz";
import AdminLayout from "@/pages/Admin/admin_layout/AdminLayout";
import Topics from "@/pages/Admin/admin_page/admin_TopicPages/Topics";
import Questions from "@/pages/Admin/admin_page/Questions";
import Users from "@/pages/Admin/admin_page/User";
import NotFound from "@/components/common/NotFound";
import PrivateRoute from "./PrivateRoute";
import PermissionRoute from "./PermissionRoute";
import { permissions } from "@/constants/rolePermission";
import UnauthorizedRoute from "./UnAuthorizeRoute";

function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/home"} />} />
      <Route element={<UnauthorizedRoute/>}>
        <Route path="/login" element={<Auth />} />
      </Route>
      <Route path="/register" element={<Auth />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/result-detail" element={<ResultDetail />} />
        <Route path="/quiz/:topicId" element={<Quiz />} />
        <Route element={<PermissionRoute requirePermission= {permissions.VIEW_ADMIN}/>}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Topics />} />
            <Route path="topics" element={<Topics />} />
            <Route path="questions" element={<Questions />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route />
    </Routes>
  );
}

export default ClientRoutes;
