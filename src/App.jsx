import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthRoot from "./Pages/AuthRoot";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./Pages/MainLayout";
import { Courses } from "./Pages/Courses";
import Singin from "./Pages/Singin";
import Signup from "./Pages/Signup";
import Course from "./Pages/Course";
import Profile from "./Pages/Profile";
import AdminPanel from "./Pages/AdminPanel";
import { AdminStatistic } from "./compontents/Admin/AdminStatistic";
import { AddNewCourse } from "./compontents/Admin/AddNewCourse";
import { AddNewVideo } from "./compontents/Admin/AddNewVideo";
import AdminCourses from "./compontents/Admin/AdminCourses";
import AdminVideos from "./compontents/Admin/AdminVideos";
import { AddNewCategory } from "./compontents/Admin/AddNewCategory";
import UpdateCourse from "./compontents/Admin/UpdateCourse";
import UpdateVideos from "./compontents/Admin/UpdateVideos";
import { AuthProvider } from "./Context/AuthContext";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <AuthRoot />,
        },
        {
          path: "/courses/:id",
          element: <Courses />,
        },
        {
          path: "/course/:id",
          element: <Course />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/signin",
          element: <Singin />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },

    {
      path: "/admin",
      element: <AdminPanel />,
      children: [
        {
          index: true,
          element: <AdminStatistic />,
        },
        {
          path: "/admin/add-new-course",
          element: <AddNewCourse />,
        },
        {
          path: "/admin/add-new-video",
          element: <AddNewVideo />,
        },
        {
          path: "/admin/courses",
          element: <AdminCourses />,
        },
        {
          path: "/admin/courses/:id",
          element: <AdminVideos />,
        },
        {
          path: "/admin/add-new-category",
          element: <AddNewCategory />,
        },
        {
          path: "/admin/update-course/:id",
          element: <UpdateCourse />,
        },
        {
          path: "/admin/update-video/:id",
          element: <UpdateVideos />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
