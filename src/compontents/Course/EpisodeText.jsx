import React from "react";

const EpisodeText = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold p-4">{title}</h2>
      <p className="p-1 text-lg text-gray-600">{description}</p>
    </div>
  );
};

export default EpisodeText;
