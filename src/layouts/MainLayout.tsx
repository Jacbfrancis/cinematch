import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/Navbar";
import LoadingMovie from "../components/LoadingMovie";

export default function MainLayout() {
  const loading = false;
  if (loading) {
    return <LoadingMovie />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
