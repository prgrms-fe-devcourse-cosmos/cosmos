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
import LabQuiz from "./pages/lab/quiz/LabQuiz";
import LabPuzzle from "./pages/lab/puzzle/LabPuzzle";

const router = createBrowserRouter([
  {
    element: <Default />,
    hydrateFallbackElement: <h1>Loading...</h1>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/daily", element: <Daily /> },
      { path: "/lounge", element: <Lounge /> },
      {
        path: "/lab",
        element: <Lab />,
        children: [
          { index: true, element: <Navigate to="quiz" replace /> },
          { path: "quiz", element: <LabQuiz /> },
          { path: "puzzle", element: <LabPuzzle /> },
        ],
      },
      { path: "/lab/quiz", element: <LabQuiz /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
