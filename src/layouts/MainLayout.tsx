import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/Navbar";
// import LoadingMovie from "../components/LoadingMovie";
// import Loading from "../components/Loading";

export default function MainLayout() {
  // const loading = true;
  // if (loading) {
  //   return (
  //     <>
  //       <Navbar />
  //       <Loading />;
  //     </>
  //   );
  // }

  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
