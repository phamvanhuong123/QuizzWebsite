import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useState} from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
function LoginForm() {
  const [hiddenPassword, setHiddenPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
        email : formData.get('email'),
        password : formData.get('password')
    }
    console.log(data)
  }
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              
                <Label htmlFor="password">Password</Label>
                <InputGroup>
                  <InputGroupInput
                    name="password"
                    id="password"
                    required
                    type={hiddenPassword ? "password" : "text"}
                  />

                  <InputGroupAddon
                    className="cursor-pointer"
                    align="inline-end"
                    onClick={() => setHiddenPassword(!hiddenPassword)}
                  >
                    {hiddenPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                  </InputGroupAddon>
                </InputGroup>
            
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="login-form" type="submit" className="w-full cursor-pointer">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
export default LoginForm;
