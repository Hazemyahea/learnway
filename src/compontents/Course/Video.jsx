import ReactPlayer from "react-player";
const Video = ({ video }) => {
  return <ReactPlayer url={video} controls={true} width="100%" />;
};

export default Video;
