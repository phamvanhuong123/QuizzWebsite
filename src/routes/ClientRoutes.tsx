import { Navigate, Route, Routes } from "react-router";
import Auth from "../pages/Auth/Auth";
import Home from "@/pages/Home/Home";
import ResultDetail from "@/pages/ResultDetail/ResultDetail";
import Quiz from "@/pages/Quiz/Quiz";
import NotFound from "@/pages/common/NotFound";

function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/result-detail" element={<ResultDetail />} />
      <Route path="/quiz" element={<Quiz />} />

      <Route path="*" element={<NotFound />} />
      <Route />
    </Routes>
  );
}

export default ClientRoutes;
