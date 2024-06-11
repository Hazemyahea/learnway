import React from "react";

const MainQuestions = ({ children }) => {
  return (
    <div className="main-questions">
      <h2>الأسئلة الشائعة</h2>
      <ul className="flex flex-col gap-7">{children}</ul>
    </div>
  );
};

export default MainQuestions;
