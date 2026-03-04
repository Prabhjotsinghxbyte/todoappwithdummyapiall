import { userLogin } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import React, { useContext, useMemo, useState } from "react";
import { UserContext } from "@/contextApi/UserContextProvider";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  username: string;
  password: string;
}

const Login = () => {
  const navigator = useNavigate();
  const { setUserData } = useContext(UserContext)!;

  const userInfo = useMemo(
    () => JSON.parse(localStorage.getItem("userInfo") || "{}"),
    [localStorage.getItem("userInfo")],
  );

  const [LoginUser, setLoginUser] = useState<LoginFormData>({
    ...userInfo,
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userResponse = await userLogin(LoginUser);
      localStorage.clear();
      localStorage.setItem("accessToken", userResponse.accessToken);
      localStorage.setItem("refreshToken", userResponse.refreshToken);
      setUserData(userResponse);
      navigator("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={LoginUser.username}
              onChange={(e) =>
                setLoginUser({ ...LoginUser, username: e.target.value })
              }
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={LoginUser.password}
              onChange={(e) =>
                setLoginUser({ ...LoginUser, password: e.target.value })
              }
              autoComplete="password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked
                onChange={() => {}}
              />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgetpassword"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
