import { createContext, useState } from "react";

export const CourseContext = createContext({
  course: [],
  setCourse: () => {},
});

function CourseContextProvider({ children }) {
  const [course, setCourse] = useState([]);

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  );
}
export default CourseContextProvider;
