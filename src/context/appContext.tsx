import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
const AppContext = createContext<any>(undefined);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
