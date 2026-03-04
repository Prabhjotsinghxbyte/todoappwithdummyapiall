import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/contextApi/UserContextProvider";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetUserDetails } from "@/api/api";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface ChangePassword {
  username: string;
  resetKey: string;
  newPassword: string;
  confirmPassword: string;
}

const ForgetModule = () => {
  const navigator = useNavigate();

  const [dilagOpen, setDialogOpen] = useState<boolean>(false);

  const { setUserData } = useContext(UserContext);

  const [inputValues, setInputValues] = useState<ChangePassword>({
    username: "",
    resetKey: "",
    newPassword: "",
    confirmPassword: "",
  });
  const passwordMatch = inputValues.newPassword === inputValues.confirmPassword;
  const inputs = [
    {
      label: "User Name",
      type: "text",
      id: "username",
      placeholder: "User Name",
    },
    {
      label: "Reset key",
      type: "text",
      id: "resetKey",
      placeholder: "Reset key",
    },
    {
      label: "New Password",
      type: "text",
      id: "newPassword",
      placeholder: "New Password",
    },
    {
      label: "Confirm Password",
      type: "text",
      id: "confirmPassword",
      placeholder: "Confirm Password",
    },
  ];
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues((prev) => ({ ...prev, [id]: value }));
    if (inputValues.newPassword !== inputValues.confirmPassword) {
    }
  };

  const HandleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValues.newPassword !== inputValues.confirmPassword) {
      setDialogOpen(true);
    } else {
      GetUserDetails(
        inputValues.username,
        inputValues.username + "pass",
        null,
        null,
      )
        .then((LoginData) => {
          if (LoginData.message) {
            console.log(LoginData.message);
          } else {
            localStorage.clear();
            localStorage.setItem("accessToken", LoginData.accessToken);
            localStorage.setItem("refreshToken", LoginData.refreshToken);
            setUserData(LoginData);
          }
        })
        .then(() => {
          setDialogOpen(true);
          navigator("/");
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a OTP to reset your
            password
          </p>
        </div>

        <form className="space-y-4" onSubmit={HandleSubmit}>
          <div className="space-y-2">
            {inputs.map((input) => (
              <div key={"l" + input.id}>
                <label
                  htmlFor={input.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {input.label}
                </label>
                <Input
                  key={input.id}
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={inputValues[input.id as keyof ChangePassword]}
                  onChange={HandleChange}
                  aria-invalid={
                    !passwordMatch && input.id === "confirmPassword"
                  }
                />
              </div>
            ))}
            <AlertDialog open={dilagOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {passwordMatch ? "Password Changed" : "Password not match"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {passwordMatch
                      ? "Your new password is set"
                      : "Type Same New Password And Confirm Password"}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                    Ok
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Remember your password?{" "}
          </span>
          <Link to="/login" className="text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetModule;
