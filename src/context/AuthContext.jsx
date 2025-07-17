import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
 
const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
 
  const navigate = useNavigate();
 
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };
 
  const signup = async (name, email, password) => {
    const key = `auth_${email}`;
    const existing = localStorage.getItem(key);
    if (existing) {
      throw new Error("Email already registered. Please login.");
    }
 
    const hashedPassword = await hashPassword(password);
    const newUser = { name, email, password: hashedPassword };
    localStorage.setItem(key, JSON.stringify(newUser));
    localStorage.setItem("user", JSON.stringify({ name, email }));
    setUser({ name, email });
  };
 
  const login = async (email, password) => {
    const storedUser = localStorage.getItem(`auth_${email}`);
    if (!storedUser) {
      throw new Error("User not found. Please sign up first.");
    }
 
    const parsedUser = JSON.parse(storedUser);
    const hashedPassword = await hashPassword(password);
    if (parsedUser.password !== hashedPassword) {
      throw new Error("Incorrect password.");
    }
 
    localStorage.setItem("user", JSON.stringify({ name: parsedUser.name, email }));
    setUser({ name: parsedUser.name, email });
  };
 
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
 
  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export const useAuth = () => useContext(AuthContext);
 