import MainCourses from "../compontents/MainCourses";
import { MainAbout } from "../compontents/MainAbout";
import MainQuestions from "../compontents/MainQuestions/MainQuestions";
import MainQuestion from "../compontents/MainQuestions/MainQuestion";
import QuestionsContextProvider from "../Context/QuestionsContext";
import { coursatFAQ } from "../HelperFu/Helper";
import MainCourse from "../compontents/MainCourse";
import { useGetLastFiveCourses } from "../config/Queryes";
import MainCategories from "../compontents/MainCategories";

const AuthRoot = () => {
  const { data: courses, error, isLoading } = useGetLastFiveCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <MainCategories />
      <MainCourses title="اشهر الكورسات">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          courses.map((course) => (
            <MainCourse key={course.id} course={course} />
          ))
        )}
      </MainCourses>
      <MainAbout />
      <QuestionsContextProvider>
        <MainQuestions>
          {coursatFAQ.map((Q) => (
            <MainQuestion key={Q.id} Q={Q}></MainQuestion>
          ))}
        </MainQuestions>
      </QuestionsContextProvider>
    </div>
  );
};

export default AuthRoot;
