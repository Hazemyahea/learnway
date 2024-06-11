import React from "react";
import { Link } from "react-router-dom";

export const MainFooter = () => {
  return (
    <footer className="p-10 containe text-center mx-auto">
      <h3 className=" text-xl font-semibold">
        تم برمجة وتصميم الموقع لغرض التعليم بواسطتى{" "}
        <Link to="">@HazemYahea</Link>
      </h3>
    </footer>
  );
};
