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
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

function RegisterForm() {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirm, setHiddenConfirm] = useState(true);

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
        email : formData.get('email'),
        password : formData.get('password'),
        comfirmPassword : formData.get("comfirmPassword")
        
    }
    console.log(data)
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to register
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="register-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Your name" required />
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <InputGroup>
                <InputGroupInput
                  name="password"
                  id="password"
                  type={hiddenPassword ? "password" : "text"}
                  required
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

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <InputGroup>
                <InputGroupInput
                  name="comfirmPassword"
                  id="confirm"
                  type={hiddenConfirm ? "password" : "text"}
                  required
                />
                <InputGroupAddon
                  className="cursor-pointer"
                  align="inline-end"
                  onClick={() => setHiddenConfirm(!hiddenConfirm)}
                >
                  {hiddenConfirm ? <FaEyeSlash /> : <IoEyeSharp />}
                </InputGroupAddon>
              </InputGroup>
            </div>

          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button form="register-form" type="submit" className="w-full cursor-pointer">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RegisterForm;