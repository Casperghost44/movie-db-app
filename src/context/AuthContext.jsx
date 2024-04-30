"use client";
import React, { createContext, useState } from "react";

// Create a context object
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children, user }) => {
  // State to store the token
  const [userModel, setUserModel] = useState(undefined);

  const updateModel = (newUser) => {
    setUserModel(newUser);
  };

  return (
    <AuthContext.Provider value={{ userModel, updateModel }}>
      {children}
    </AuthContext.Provider>
  );
};
