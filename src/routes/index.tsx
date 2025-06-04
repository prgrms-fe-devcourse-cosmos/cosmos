import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Default from "./layouts/RootLayout";
import Daily from "./pages/Daily";
import Lounge from "./pages/Lounge";
import Lab from "./pages/Lab";
import Login from "./pages/Login";
import Films from "../components/lounge/Films";
import FilmsDetail from "../components/lounge/FilmsDetail";
import Gallery from "../components/lounge/Gallery";
import GalleryDetail from "../components/lounge/GalleryDetail";
import Talk from "../components/lounge/Talk";
import TalkDetail from "../components/lounge/TalkDetail";

const router = createBrowserRouter([
  {
    element: <Default />,
    hydrateFallbackElement: <h1>Loading...</h1>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/daily", element: <Daily /> },
      {
        path: "/lounge",
        element: <Lounge />,
        children: [
          { index: true, element: <Films /> },
          { path: "film/:id", element: <FilmsDetail /> },
          { path: "gallery", element: <Gallery /> },
          { path: "gallery/:id", element: <GalleryDetail /> },
          { path: "talk", element: <Talk /> },
          { path: "talk/:id", element: <TalkDetail /> },
        ],
      },
      { path: "/lab", element: <Lab /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
