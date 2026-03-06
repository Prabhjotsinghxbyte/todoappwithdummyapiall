import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <header className="">
        <Navbar />
      </header>
      <section className="flex-1 overflow-y-auto">
        <Outlet />
      </section>

      <footer className="px-4 py-3 border-t text-sm text-center">
        Todos manage your tasks efficiently
      </footer>
    </main>
  );
};

export default Layout;
