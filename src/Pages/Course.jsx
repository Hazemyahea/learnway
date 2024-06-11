import { useParams } from "react-router-dom";
import CourseContextProvider from "../Context/CourseContext";
import Episodes from "../compontents/Course/Episodes";
import { EpispdeContent } from "../compontents/Course/EpispdeContent";
import { useAddCourseToUser, useGetUserCourses } from "../config/Queryes";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Course = () => {
  const { user } = useContext(AuthContext);
  const { id: courseId } = useParams();

  const {
    mutate: addCourseToUser,
    isSuccess,
    error: addCourseToUserError,
  } = useAddCourseToUser();

  const handleAddCourseToUser = (userId, courseId) => {
    addCourseToUser({ userId, courseId });

    toast.success("Course added successfully");
  };

  return (
    <>
      <ToastContainer />
      {user && (
        <button
          className=" bg-slate-700  text-white p-2  absolute top-100 right-0"
          onClick={() => handleAddCourseToUser(user?.id, courseId)}
        >
          +
        </button>
      )}
      <div className="flex flex-col-reverse  lg:flex-row gap-4 mt-5 mx-auto container">
        <CourseContextProvider>
          <Episodes />
          <EpispdeContent />
        </CourseContextProvider>
      </div>
    </>
  );
};

export default Course;
