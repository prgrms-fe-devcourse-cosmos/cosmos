import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Default from "./layouts/RootLayout";
import Daily from "./pages/Daily";
import Lounge from "./pages/Lounge";
import Films from "../components/lounge/films/Films";
import FilmsDetail from "../components/lounge/films/FilmsDetail";
import Gallery from "../components/lounge/gallery/Gallery";
import GalleryDetail from "../components/lounge/gallery/GalleryDetail";
import Talk from "../components/lounge/talk/Talk";
import TalkDetail from "../components/lounge/talk/TalkDetail";
import Lab from "./pages/lab/Lab";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LabQuiz from "./pages/lab/quiz/LabQuiz";
import LabPuzzle from "./pages/lab/puzzle/LabPuzzle";
import { DailyLoader } from "../loader/dallyspace.loader";
import PuzzleScreen from "./pages/lab/puzzle/PuzzleScreen";
import LabRank from "./pages/lab/rank/LabRank";
import { reviewLoader } from "../loader/review.loader";
import PuzzleConfigScreen from "./pages/lab/puzzle/PuzzleConfigScreen";
import LoadingSpinner from "../components/common/LoadingSpinner";
import GalleryAdd from "../components/lounge/gallery/GalleryAdd";
import UserPage from "./pages/UserPage";
import QuizConfigScreen from "./pages/lab/quiz/QuizConfigScreen";
import QuizScreen from "./pages/lab/quiz/QuizScreen";
import { requireAuth, requireNoAuth } from "../loader/auth.loader";
import TalkAdd from "../components/lounge/talk/TalkAdd";
import TalkEdit from "../components/lounge/talk/TalkEdit";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    element: <Default />,
    hydrateFallbackElement: <LoadingSpinner />,
    errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", loader: requireNoAuth, element: <Login /> },
      {
        path: "/daily",
        loader: DailyLoader,
        element: <Daily />,
      },

      {
        path: "/lounge",
        element: <Lounge />,
        children: [
          { index: true, element: <Navigate to="films" replace /> },
          {
            path: "films",
            children: [
              { index: true, element: <Films /> },
              { path: ":id", loader: reviewLoader, element: <FilmsDetail /> },
            ],
          },
          {
            path: "gallery",
            children: [
              { index: true, element: <Gallery /> },
              {
                path: ":postid",
                loader: requireAuth,
                element: <GalleryDetail />,
              },
              { path: "add", loader: requireAuth, element: <GalleryAdd /> },
              {
                path: ":postId/edit",
                loader: requireAuth,
                element: <GalleryAdd mode="edit" />,
              },
            ],
          },
          {
            path: "talk",
            children: [
              { index: true, element: <Talk /> },
              { path: ":id", loader: requireAuth, element: <TalkDetail /> },
              { path: "add", loader: requireAuth, element: <TalkAdd /> },
              { path: ":id/edit", loader: requireAuth, element: <TalkEdit /> },
            ],
          },
        ],
      },
      { path: "/signup", loader: requireNoAuth, element: <Signup /> },

      {
        path: "/lab",
        element: <Lab />,
        children: [
          {
            path: "quiz",
            loader: requireAuth,
            element: <LabQuiz />,
            children: [
              { index: true, element: <Navigate to="config" replace /> },
              {
                path: "config",
                element: <QuizConfigScreen />,
              },
              { path: "play", element: <QuizScreen /> },
            ],
          },
          {
            path: "puzzle",
            loader: requireAuth,
            element: <LabPuzzle />,
            children: [
              { index: true, element: <Navigate to="config" replace /> },
              { path: "config", element: <PuzzleConfigScreen /> },
              { path: "play", loader: DailyLoader, element: <PuzzleScreen /> },
            ],
          },
          { path: "rank", element: <LabRank /> },
        ],
      },
      { path: "/user/:code", loader: requireAuth, element: <UserPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
