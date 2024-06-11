import React from "react";
import { Link } from "react-router-dom";
import { useGetCourseById } from "../config/Queryes";

const MainCourse = ({ course }) => {
  return (
    <div className="p-3 border border-gray-400 rounded-md w-fit">
      <Link to={`/course/${course.id}`}>
        <img
          src={course.image}
          alt="React Course"
          className="w-full h-[250px] object-cover"
        />
      </Link>
      <div className="flex gap-2 p-3 items-center justify-between">
        <h3 className="text-2xl font-semibold">{course.title}</h3>
        <span className="text-gray-500">{course.categories.title}</span>
      </div>
    </div>
  );
};

export default MainCourse;
