import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contextApi/themeProvider";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "@/contextApi/UserContextProvider";

const linkBase = "px-3 py-2 rounded-md transition-colors text-sm";
const linkLight = "text-gray-700 hover:bg-gray-100";
const linkDark = "dark:text-gray-100 dark:hover:bg-gray-800";

const Navbar = () => {
  const navigator = useNavigate();

  const { userData, setUserData, logedin, setLogedin } =
    useContext(UserContext)!;

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  console.log(logedin);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Todos App
            </NavLink>
            <div className="flex items-center gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkBase} ${linkLight} ${linkDark} ${isActive ? "bg-gray-100 dark:bg-gray-800" : ""}`
                }
              >
                Home
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`${!logedin ? "flex items-center gap-2" : "hidden"}`}
            >
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkBase} ${linkLight} ${linkDark} ${isActive ? "bg-gray-100 dark:bg-gray-800" : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${linkBase} ${linkLight} ${linkDark} ${isActive ? "bg-gray-100 dark:bg-gray-800" : ""}`
                }
              >
                Signup
              </NavLink>
            </div>
            <div
              className={`${logedin ? "flex items-center gap-2" : "hidden"}`}
            >
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  ` ${isActive ? "bg-gray-100 dark:bg-gray-800" : ""}`
                }
              >
                <Button variant="outline">
                  <img
                    src={localStorage.getItem("image") || userData?.image}
                    alt="Profile"
                    className="h-6 w-6 rounded-full"
                  />
                  {userData?.firstName}
                </Button>
              </NavLink>

              <Button
                variant="outline"
                onClick={() => {
                  localStorage.clear();
                  setLogedin(false);
                  setUserData({
                    accessToken: "",
                    email: "",
                    firstName: "",
                    gender: "male",
                    id: 0,
                    image: "",
                    lastName: "",
                    refreshToken: "",
                    username: "",
                    password: "",
                  });
                  navigator("/login");
                }}
                className={` ${linkLight} ${linkDark}`}
              >
                Logout
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={toggleTheme}
              className="relative"
            >
              <Sun className="h-4 w-4 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
