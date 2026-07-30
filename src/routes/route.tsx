import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";

export const routes = [
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <HomePage /> }],
  },
];
