import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import QuestionnairePage from "../pages/QuestionnairePage";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "questionnaire", element: <QuestionnairePage /> },
    ],
  },
];
