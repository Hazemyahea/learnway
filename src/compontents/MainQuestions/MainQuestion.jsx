import React, { useContext } from "react";
import { QuestionsContext } from "../../Context/QuestionsContext";

const MainQuestion = ({ Q }) => {
  const { CTXId, toogleId } = useContext(QuestionsContext);

  function ToogleHandler() {
    toogleId(Q.id);
  }
  return (
    <li>
      <h3
        className="text-3xl font-semibold mb-2 cursor-pointer"
        onClick={ToogleHandler}
      >
        {Q.question}
      </h3>
      <p className={`text-xl ${CTXId === Q.id ? "block" : "hidden"}`}>
        {Q.answer}
      </p>
    </li>
  );
};

export default MainQuestion;
