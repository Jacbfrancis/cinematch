import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import QuestionnairePage from "../pages/QuestionnairePage";
import SurpriseMePage from "../pages/SurpriseMePage";
import RecommendationPage from "../pages/RecommendationPage";
import FavoritesPage from "../pages/FavoritesPage";
import AuthPage from "../pages/AuthPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "questionnaire", element: <QuestionnairePage /> },
      { path: "surprise-me", element: <SurpriseMePage /> },
      { path: "results", element: <RecommendationPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "authentication", element: <AuthPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
];
