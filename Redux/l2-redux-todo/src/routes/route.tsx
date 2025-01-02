import App from "@/App";
import Task from "@/pages/tasks/Task";
import User from "@/pages/users/User";
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
        path: "users",
        element: <User />,
      },
    ],
  },
]);

export default router;
