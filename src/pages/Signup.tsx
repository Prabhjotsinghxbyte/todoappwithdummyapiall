import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

type newUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string | number;
};

export const Signup = () => {
  const [newUser, setnewUser] = useState<newUser>({
    id: Date.now(),
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const fields = [
    {
      id: "username",
      type: "text",
      placeholder: "Choose a username",
      label: "Username",
    },
    {
      id: "email",
      type: "email",
      placeholder: "m@example.com",
      label: "Email",
    },
    {
      id: "password",
      type: "password",
      placeholder: "Create a password",
      label: "Password",
    },
    {
      id: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      label: "Confirm Password",
    },
  ];

  const labelClass =
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(`Input changed: ${id} = ${value}`);
    console.log("Current newUser state before update:", newUser);
    setnewUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleClick = () => {
    console.log(newUser);
    console.log("Button clicked!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your details to get started
          </p>
        </div>
        <form className="space-y-4">
          {fields.map(({ id, type, placeholder, label }) => (
            <div key={id} className="space-y-2">
              <label htmlFor={id} className={labelClass}>
                {label}
              </label>
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                autoComplete={id}
                value={newUser[id]}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              handleClick();
            }}
          >
            Sign up
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
