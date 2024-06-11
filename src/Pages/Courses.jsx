import React, { useContext, useEffect, useState } from "react";
import MainCourses from "../compontents/MainCourses";
import MainCourse from "../compontents/MainCourse";
import { useGetCoursesByCategory } from "../config/Queryes";
import { useParams } from "react-router-dom";
import MainCategories from "../compontents/MainCategories";

export const Courses = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1); // State to track page number
  const [courses, setCourses] = useState([]); // State to hold all courses
  const { data, isLoading, error } = useGetCoursesByCategory(id, page);

  useEffect(() => {
    if (data) {
      setCourses((prevCourses) => [...prevCourses, ...data]);
    }
  }, [data]);
  const handleMoreClick = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
  };

  return (
    <div>
      {error && <h1>{error.message}</h1>}
      <MainCategories setPage={setPage} fnWork={true} setCourses={setCourses} />
      <MainCourses more={true} handleMoreClick={handleMoreClick}>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {courses?.map((course) => (
              <MainCourse key={course.id} course={course} />
            ))}
            {/* Button to load more courses */}
          </>
        )}
      </MainCourses>
    </div>
  );
};
