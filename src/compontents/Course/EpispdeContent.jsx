import React, { useContext } from "react";
import Video from "./Video";
import EpisodeText from "./EpisodeText";
import { CourseContext } from "../../Context/CourseContext";

export const EpispdeContent = () => {
  const { course } = useContext(CourseContext);

  const { name, url, info } = course;
  return (
    <div className="flex-1 order-1">
      <Video video={url} />
      <EpisodeText title={name} description={info} />
    </div>
  );
};
