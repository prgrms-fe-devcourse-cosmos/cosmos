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
import Lab from "./pages/lab/Lab";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LabQuiz from "./pages/lab/quiz/LabQuiz";
import LabPuzzle from "./pages/lab/puzzle/LabPuzzle";
import { DailyLoader } from "./loader/dallyspace.loader";
import PuzzleConfig from "./pages/lab/puzzle/PuzzleConfig";
import PuzzleScreen from "./pages/lab/puzzle/PuzzleScreen";


const router = createBrowserRouter([
  {
    element: <Default />,
    hydrateFallbackElement: <h1>Loading...</h1>,
    errorElement: <div>데이터를 불러오는 데 실패했습니다.</div>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      {
        path: "/daily",
        loader: DailyLoader,
        element: <Daily />,
      },
      { path: "/lounge", element: <Lounge /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/lab",
        element: <Lab />,
        children: [
          { path: "quiz", element: <LabQuiz /> },
          {
            path: "puzzle",
            element: <LabPuzzle />,
            children: [
              { index: true, element: <Navigate to="config" replace /> },
              { path: "config", element: <PuzzleConfig /> },
              { path: "play", element: <PuzzleScreen /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
