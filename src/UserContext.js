import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    const data = storedData ? JSON.parse(storedData) : null;
    if (data) setUser(data);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
