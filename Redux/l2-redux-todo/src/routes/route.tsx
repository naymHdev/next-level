import App from "@/App";
import Task from "@/pages/tasks/Task";
import User from "@/pages/user/User";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Task />,
      },
      {
        path: "user",
        element: <User />,
      },
    ],
  },
]);

export default router;
