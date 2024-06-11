import { useEffect } from "react";
import { useGetAllCategories } from "../config/Queryes";

const CoursesNav = ({ setCategory }) => {
  const { data: allCategories, isLoading, error } = useGetAllCategories();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="p-4 flex justify-center bg-green-700 ">
      <ul className="flex gap-8  text-xl font-bold  text-white rounded-lg p-2 ">
        {allCategories.map((category) => (
          <li
            key={category.id}
            className="cursor-pointer transition-all hover:text-black"
            onClick={() => setCategory(category.id)}
          >
            {category?.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesNav;
