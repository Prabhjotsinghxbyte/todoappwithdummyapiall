import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

type newUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string | number;
};
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
export const Signup = () => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      const email = (form.elements.namedItem("email") as HTMLInputElement)
        .value;
      const username = form.elements.namedItem("username") as HTMLInputElement;
      const confirmPassword = form.elements.namedItem(
        "confirmPassword",
      ) as HTMLInputElement;
      const password = form.elements.namedItem("password") as HTMLInputElement;
      const data: newUser = {
        id: Date.now(),
        email: String(email),
        username: String(username),
        password: String(password),
        confirmPassword: String(confirmPassword),
      };
    } catch (error) {}
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
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          {fields.map(({ id, type, placeholder, label }) => (
            <div key={id} className="space-y-2">
              <label
                htmlFor={id}
                className={
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                }
              >
                {label}
              </label>
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                autoComplete={id}
              />
            </div>
          ))}
          <Button type="submit" className="w-full">
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
