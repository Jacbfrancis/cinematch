import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
