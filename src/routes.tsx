import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import File from "./routes/File";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/files/:fileId",
    element: <File />,
  },
]);
