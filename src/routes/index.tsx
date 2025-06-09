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

import Films from "../components/Lounge/films/Films";
import FilmsDetail from "../components/Lounge/films/FilmsDetail";
import Gallery from "../components/Lounge/gallery/Gallery";
import GalleryDetail from "../components/Lounge/gallery/GalleryDetail";
import Talk from "../components/Lounge/talk/Talk";
import TalkDetail from "../components/Lounge/talk/TalkDetail";
import Lab from "./pages/lab/Lab";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LabQuiz from "./pages/lab/quiz/LabQuiz";
import LabPuzzle from "./pages/lab/puzzle/LabPuzzle";
import { DailyLoader } from "./loader/dallyspace.loader";
import PuzzleScreen from "./pages/lab/puzzle/PuzzleScreen";
import { reviewLoader } from "./loader/review.loader";
import PuzzleConfigScreen from "./pages/lab/puzzle/PuzzleConfigScreen";
import LoadingSpinner from '../components/common/LoadingSpinner';

const router = createBrowserRouter([
  {
    element: <Default />,
    hydrateFallbackElement: <LoadingSpinner />,
    errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      {
        path: '/daily',
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
            ],
          },
          {
            path: "talk",
            children: [
              { index: true, element: <Talk /> },
              { path: ":id", element: <TalkDetail /> },
            ],
          },
        ],
      },
      { path: "/signup", element: <Signup /> },
      {
        path: '/lab',
        element: <Lab />,
        children: [
          { path: 'quiz', element: <LabQuiz /> },
          {
            path: 'puzzle',
            element: <LabPuzzle />,
            children: [
              { index: true, element: <Navigate to="config" replace /> },
              { path: "config", element: <PuzzleConfigScreen /> },
              { path: "play", loader: DailyLoader, element: <PuzzleScreen /> },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
