import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Default from "./layouts/RootLayout";
import Daily from "./pages/Daily";
import Lounge from "./pages/Lounge";
import Lab from "./pages/Lab";
import Login from "./pages/Login";
import Films from "../components/Lounge/Films";
import FilmsDetail from "../components/Lounge/FilmsDetail";
import Gallery from "../components/Lounge/Gallery";
import GalleryDetail from "../components/Lounge/GalleryDetail";
import Talk from "../components/Lounge/Talk";
import TalkDetail from "../components/Lounge/TalkDetail";
import { DailyLoader } from "./loader/dallyspace.loader";

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
