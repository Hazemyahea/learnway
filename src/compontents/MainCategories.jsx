import React from "react";
import { useGetAllCategories } from "../config/Queryes";
import { Link } from "react-router-dom";

const MainCategories = ({ setPage, fnWork, setCourses }) => {
  const { data: categories, isPending, isError, error } = useGetAllCategories();
  function setPageHandler(page) {
    if (fnWork) {
      setPage(page);
      setCourses([]);
    }
  }
  return (
    <div className="p-10">
      <h2 className="text-2xl md:text-4xl text-center font-bold p-5 mb-3">
        تصفح جميع الاقسام
      </h2>

      <div className="flex justify-center items-center gap-5">
        {categories?.map((category) => (
          <Link
            to={`/courses/${category.id}`}
            key={category.id}
            onClick={() => setPageHandler(1)}
          >
            <p className="text-center text-xl rounded-md p-2 border transition-all  border-gray-3000 hover:bg-green-700 hover:text-white">
              {category?.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainCategories;
