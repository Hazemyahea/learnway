import { useParams } from "react-router-dom";
import { epsiods } from "../../HelperFu/Helper";
import { Episode } from "./Episode";
import { useGetCourseById } from "../../config/Queryes";

const Episodes = () => {
  const { id } = useParams();
  const { data: theCourse, error, isLoading } = useGetCourseById(id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="max-h-96 overflow-y-auto bg-gray-200 p-5">
      <ul className="flex flex-col gap-4">
        {theCourse[0]?.video.map((episode) => (
          <Episode key={episode.id} episode={episode} />
        ))}
      </ul>
    </div>
  );
};

export default Episodes;
