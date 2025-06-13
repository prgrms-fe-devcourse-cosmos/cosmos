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
import PuzzleScreen from "./pages/lab/puzzle/PuzzleScreen";
import PuzzleConfigScreen from "./pages/lab/puzzle/PuzzleConfigScreen";
import LoadingSpinner from "../components/common/LoadingSpinner";
import LabRank from "./pages/lab/rank/LabRank";
import GalleryAdd from "../components/lounge/gallery/GalleryAdd";
import { DailyLoader } from "../loader/dallyspace.loader";
import { reviewLoader } from "../loader/review.loader";
import TalkAdd from "../components/lounge/talk/TalkAdd";
import User from "./pages/User";
import QuizConfigScreen from "./pages/lab/quiz/QuizConfigScreen";
import QuizScreen from "./pages/lab/quiz/QuizScreen";
import TalkEdit from "../components/lounge/talk/TalkEdit";

const router = createBrowserRouter([
  {
    element: <Default />,
    hydrateFallbackElement: <LoadingSpinner />,
    errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
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
              { path: ":id", element: <GalleryDetail /> },
              { path: "add", element: <GalleryAdd /> },
            ],
          },
          {
            path: "talk",
            children: [
              { index: true, element: <Talk /> },
              { path: ":id", element: <TalkDetail /> },
              { path: "add", element: <TalkAdd /> },
              { path: ":id/edit", element: <TalkEdit /> },
            ],
          },
        ],
      },
      { path: "/signup", element: <Signup /> },
      {
        path: "/lab",
        element: <Lab />,
        children: [
          {
            path: "quiz",
            element: <LabQuiz />,
            children: [
              { index: true, element: <Navigate to="config" replace /> },
              { path: "config", element: <QuizConfigScreen /> },
              { path: "play", element: <QuizScreen /> },
            ],
          },
          {
            path: "puzzle",
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
      { path: "/user/:code", element: <User /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
