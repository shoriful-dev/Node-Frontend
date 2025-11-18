import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../helpers/axios";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const isEmail = identifier.includes("@");

    const data = {
      email: isEmail ? identifier : null,
      phoneNumber: !isEmail ? identifier : null,
      password: password,
    };

    try {
     const res =  await api.post("/auth/login" , data);
     if(res.statusText =="OK"){
       localStorage.setItem("accesToken" , res.data.data.accesToken);
       navigate('/')
     }
    } catch (error) {
      console.log('error from login' , error)
    }


  };

  return (
    <div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email or phone number to login
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                {/* Identifier Field */}
                <Field>
                  <FieldLabel>Email or Phone Number</FieldLabel>
                  <Input
                    type="text"
                    required
                    placeholder="email@example.com or 9876543210"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </Field>

                {/* Password Field with Eye toggle */}
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </Field>

                {/* Actions */}
                <Field>
                  <Button type="submit" className="w-full">Login</Button>
                  <Button variant="outline" type="button" className="w-full mt-2">
                    Login with Google
                  </Button>

                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <a href="#">Sign up</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

