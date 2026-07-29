import { Outlet, ScrollRestoration } from "react-router";

export default function MainLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
