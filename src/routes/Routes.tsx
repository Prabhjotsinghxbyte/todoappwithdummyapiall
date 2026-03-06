import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Signup } from "../pages/Signup";
import Dashboard from "@/pages/Dashboard";
import ForgetModule from "@/pages/ForgetModule";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgetpassword" element={<ForgetModule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
