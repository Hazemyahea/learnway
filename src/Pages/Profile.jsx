import { Link, useParams } from "react-router-dom";
import {
  useDeleteCourseFromUser,
  useGetUserCourses,
  useGetUserProfile,
} from "../config/Queryes";
import Loader from "../compontents/UI/Loader";
import { useContext, useEffect, useState } from "react";
import ProfileUpdate from "../compontents/ProfileUpdate";
import AuthContext from "../Context/AuthContext";
const Profile = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { id } = useParams();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    data: userProfile,
    isLoading,
    error,
    isSuccess,
  } = useGetUserProfile(id);
  const {
    data: userCourses,
    isLoading: userCoursesLoading,
    error: userCoursesError,
  } = useGetUserCourses(id);

  const { mutate: deleteCourseFromUser } = useDeleteCourseFromUser();
  if (isLoading || userCoursesLoading) {
    return (
      <div className="container mx-auto flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  console.log(userCourses);
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="container mx-auto">
      {isDialogOpen && (
        <ProfileUpdate
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          userProfile={userProfile}
        />
      )}
      {error && <div>{error.message}</div>}
      <h1 className="text-4xl font-bold mb-5 mt-5 text-center">الملف الشخصي</h1>
      <div className="flex gap-4 items-center mt-5">
        <div className="w-20 h-20 rounded-full">
          <img
            alt=""
            src={
              userProfile[0].image ||
              "https://secure.gravatar.com/avatar/?s=96&amp;d=mm&amp;r=g"
            }
            height="100"
            width="100"
            className="rounded-full"
          ></img>
        </div>
        <div className="text-lg font-bold">{userProfile[0].username}</div>
      </div>
      <div>
        <div className="flex flex-col p-5">
          {isAuthenticated && (
            <button
              className="text-blue-500 hover:text-blue-700 w-fit"
              onClick={() => setDialogOpen(true)}
            >
              تعديل الملف الشخصي
            </button>
          )}
          <h2 className="text-2xl mb-3 font-bold mt-5">كورساتى</h2>
          <ul className="flex flex-col gap-2 bg-gray-200 p-5 rounded-md">
            {console.log(userCourses)}
            {userCourses?.length <= 0 ? (
              <p className="text-center p-5 text-lg text-gray-500 bg-gray-200 rounded-md">
                انت لا تتابع اى كورسات حالياً
              </p>
            ) : (
              userCourses?.map((course) => (
                <li
                  className=" text-lg bg-white  p-2 rounded-md flex justify-between items-center"
                  key={course.id}
                >
                  <Link to={`/course/${course?.courses?.id}`}>
                    {course?.courses?.title}
                  </Link>
                  <button
                    className="bg-red-500 text-white p-2 rounded-md"
                    onClick={() =>
                      deleteCourseFromUser({
                        userId: id,
                        courseId: course?.courses?.id,
                      })
                    }
                  >
                    حذف
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
