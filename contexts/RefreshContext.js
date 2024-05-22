import React, { createContext, useContext, useState } from 'react';

const RefreshContext = createContext();

export const useRefresh = () => useContext(RefreshContext);

export const RefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  const refreshPosts = () => setRefresh(!refresh);

  return (
    <RefreshContext.Provider value={{ refresh, refreshPosts }}>
      {children}
    </RefreshContext.Provider>
  );
};
