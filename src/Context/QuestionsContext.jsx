import { createContext, useState } from "react";

export const QuestionsContext = createContext({
  CTXId: 0,
  toogleId: () => {},
});

function QuestionsContextProvider({ children }) {
  const [CTXId, setId] = useState(0);

  const toogleId = (id) => {
    setId((prevId) => (prevId == id ? 0 : id));
  };

  const value = {
    CTXId,
    toogleId,
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
}

export default QuestionsContextProvider;
