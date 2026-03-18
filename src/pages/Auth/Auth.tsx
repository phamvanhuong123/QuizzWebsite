import { useLocation, useNavigate } from "react-router";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Auth() {
  const location = useLocation();
  const navigate = useNavigate()
    const currentTab = location.pathname === "/login" ? "login" : "register";
  return (
    <div className="py-10">
      <div className="w-[30%] max-lg:w-[50%] max-sm:w-[90%] ml-auto mr-auto">
        <h1 className="text-center mb-3.5 font-semibold text-3xl">Quiz Pro</h1>
        <p className="text-center mb-3.5">Elevate your learning journey today</p>
        <Tabs value={currentTab}  onValueChange={(path => navigate(`/${path}`))}>
          <TabsList className="w-full cursor-pointer mb-4 ">
            <TabsTrigger className="cursor-pointer" value="login" >Login</TabsTrigger>
            <TabsTrigger className='cursor-pointer' value="register">Register</TabsTrigger>
            
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        
        </Tabs>
      </div>
    
    </div>
  );
}
export default Auth;
