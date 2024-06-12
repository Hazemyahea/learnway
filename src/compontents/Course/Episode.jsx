import React, { useContext, useEffect } from "react";
import { CourseContext } from "../../Context/CourseContext";

export const Episode = ({ episode }) => {
  const { setCourse } = useContext(CourseContext);
  useEffect(() => {
    setCourse(episode);
  }, []);

  return (
    <li
      className=" cursor-pointer p-4  transition-all duration-300 text-wrap  bg-white hover:bg-gray-300"
      onClick={() => setCourse(episode)}
    >
      {episode.title.slice(0, 100)}
    </li>
  );
};
