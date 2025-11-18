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

export function RegistrationForm({ className, ...props }) {
    const navigate =  useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const isValidPhone = (num) => {
    return /^[0-9]{8,15}$/.test(num); // digits only, length 8–15
  };

   const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    // RULE: At least email OR phone
    if (!email && !phoneNumber) {
      return setError("Please provide either email or phone number.");
    }

    // Phone validation (only if phoneNumber not empty)
    if (phoneNumber && !isValidPhone(phoneNumber)) {
      return setError("Phone number must contain only digits and be 8–15 characters long.");
    }

    const data = {
      name,
      email: email || null,
      phoneNumber: phoneNumber || null,
      password,
    };

    try {
       const res =  await api.post('/auth/registration' , data , {
            headers:{
                'Content-Type':"application/json"
            }
        })
        if(res.status == 201) {
            
        }
        console.log("Registration data:", res);
    } catch (error) {
        navigate('/login')
        console.log(error)
    }
  };

  return (
    <div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Register using email or phone</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                
                {/* Name */}
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                </Field>

                {/* Email */}
                <Field>
                  <FieldLabel>Email (optional)</FieldLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                  />
                </Field>

                {/* Phone Number */}
                <Field>
                  <FieldLabel>Phone Number (optional)</FieldLabel>
                  <Input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="9876543210"
                  />
                </Field>

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                {/* Password */}
                <Field>
                  <FieldLabel>Password</FieldLabel>
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

                {/* Submit */}
                <Field>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>

                  <FieldDescription className="text-center">
                    Already have an account? <a href="#">Login</a>
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
