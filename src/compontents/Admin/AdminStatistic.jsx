import React from "react";
import {
  useGetAllCourses,
  useGetAllVideos,
  useGetCoursesNumber,
} from "../../config/Queryes";

export const AdminStatistic = () => {
  const { data: courses, isLoading: coursesLoading } = useGetCoursesNumber();
  const { data: videos, isLoading: videosLoading } = useGetAllVideos();

  return (
    <div className="flex gap-10 text-white">
      <div className=" bg-red-500 p-5 rounded-md h-fit">
        <h2 className="text-2xl font-bold">عدد الكورسات</h2>
        <p className="text-4xl font-bold">
          {coursesLoading ? "جاري التحميل..." : courses.length}
        </p>
      </div>

      <div className=" bg-green-500 text-white p-5 rounded-md h-fit">
        <h2 className="text-2xl font-bold">عدد الفيديوهات</h2>
        <p className="text-4xl font-bold">
          {videosLoading ? "جاري التحميل..." : videos.length}
        </p>
      </div>
    </div>
  );
};
