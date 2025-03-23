// PinnedLeaguesContext.js
import React, { createContext, useContext, useState } from "react";

const PinnedLeaguesContext = createContext();

export const PinnedLeaguesProvider = ({ children }) => {
  const [pinnedLeagues, setPinnedLeagues] = useState([]); // In-memory state

  return (
    <PinnedLeaguesContext.Provider value={{ pinnedLeagues, setPinnedLeagues }}>
      {children}
    </PinnedLeaguesContext.Provider>
  );
};

export const usePinnedLeagues = () => {
  const context = useContext(PinnedLeaguesContext);
  if (!context) {
    throw new Error("usePinnedLeagues must be used within a PinnedLeaguesProvider");
  }
  return context;
};