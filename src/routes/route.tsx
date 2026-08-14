import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import QuestionnairePage from "../pages/QuestionnairePage";
import SurpriseMePage from "../pages/SurpriseMePage";
import RecommendationPage from "../pages/RecommendationPage";
import FavoritesPage from "../pages/FavoritesPage";
import AuthPage from "../pages/AuthPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import SearchPage from "../pages/SearchPage";
import HowItWorksPage from "../pages/HowItWorksPage";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "movie/:id", element: <MovieDetailsPage /> },
      { path: "questionnaire", element: <QuestionnairePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "surprise-me", element: <SurpriseMePage /> },
      { path: "results", element: <RecommendationPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "how-it-works", element: <HowItWorksPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
];
