import { createContext, useState } from 'react';
import React from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(undefined);

  return (
    <UserContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

