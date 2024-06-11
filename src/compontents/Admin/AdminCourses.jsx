import { Link } from "react-router-dom";
import { useDeleteCourse, useGetAllCourses } from "../../config/Queryes";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Context/AdminContext";
import Loader from "../UI/Loader";

const AdminCourses = () => {
  const [page, setPage] = useState(1);
  const [Courses, setCourses] = useState([]);
  console.log(Courses.length);
  const { ChoosenCourse, setChoosenCourse } = useContext(AdminContext);
  const { data, isLoading } = useGetAllCourses(page);
  const { mutate: deleteCourse, isDeleting, isDeleted } = useDeleteCourse();

  useEffect(() => {
    if (data) {
      setCourses(data);
    }
  }, [data]);

  function handleDeleteCourse(id) {
    if (confirm("Are you sure you want to delete this course?")) {
      deleteCourse(id);
      toast.success("تم حذف الكورس بنجاح");
    }
  }

  function Handelincrement() {
    setPage((prev) => prev + 1);
  }

  function HandelDecrement() {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  }

  return (
    <div>
      <ToastContainer />
      <h1 className="text-center text-3xl font-bold mb-4">الكورسات</h1>
      <div>
        <ul className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md text-lg">
          {isLoading ? (
            <Loader />
          ) : Courses.length > 0 ? (
            Courses?.map((course) => (
              <li
                className="flex justify-between items-center gap-4 border-b bg-white border-gray-200 p-4"
                key={course.id}
              >
                <Link to={`/admin/courses/${course.id}`}>{course.title}</Link>
                <div className=" flex gap-1 font-sm">
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="bg-red-500 text-white p-1 text-center rounded-md"
                    disabled={isDeleting}
                  >
                    حذف الكورس
                  </button>
                  <Link
                    to={`/admin/update-course/${course.id}`}
                    className="bg-blue-500 text-white p-1 text-center rounded-md"
                    onClick={() => setChoosenCourse(course)}
                  >
                    تعديل الكورس
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p>لايوجد المذيد من الكورسات</p>
          )}
          <div className="flex justify-between">
            <button
              className=" bg-red-700 text-white p-2 rounded-lg"
              onClick={() => HandelDecrement()}
            >
              السابق
            </button>
            {Courses.length > 0 && (
              <button
                className=" bg-green-600 text-white p-2 rounded-lg"
                onClick={() => Handelincrement()}
              >
                التالى
              </button>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AdminCourses;
