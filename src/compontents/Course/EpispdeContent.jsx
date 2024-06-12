import React, { useContext } from "react";
import Video from "./Video";
import EpisodeText from "./EpisodeText";
import { CourseContext } from "../../Context/CourseContext";

export const EpispdeContent = () => {
  const { course } = useContext(CourseContext);

  const { name, url, info } = course;
  return (
    <div className="order-1  lg:w-4/5">
      <Video video={url} />
      <EpisodeText title={name} description={info} />
    </div>
  );
};
