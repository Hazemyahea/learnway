import { Link } from "react-router-dom";
import MainCourse from "./MainCourse";

const MainCourses = ({ children, title, more, handleMoreClick }) => {
  return (
    <div className=" bg-gray-100 rounded-md">
      {title && <h2 className="text-2xl font-bold p-5 mb-3">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        {children}
      </div>
      {more ? (
        <div className="flex justify-center items-center">
          <button
            className="text-lg font-bold text-white bg-green-600 p-2 rounded-md mb-5 text-center"
            to="/courses"
            onClick={handleMoreClick}
          >
            المزيد من الكورسات
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center p-5 text-red-700">
          <p className=" text-xl">لايوجد كورسات أخري</p>
        </div>
      )}
    </div>
  );
};

export default MainCourses;
