import React, { createContext, useState, useEffect } from "react";
import { sign, verify, decode } from "jsonwebtoken-esm";

const AuthContext = createContext();

const SECRET_KEY = "my_secret"; // Change this to a strong key

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = verify(token, SECRET_KEY);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token");
        logout();
      }
    }
  }, []);

  const signup = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) return { error: "User already exists!" };

    const hashedPassword = sign({ password }, SECRET_KEY);
    users[username] = hashedPassword;
    localStorage.setItem("users", JSON.stringify(users));

    return { success: "Signup successful!" };
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]) return { error: "User not found!" };

    const isValid = verify(users[username], SECRET_KEY).password === password;
    if (!isValid) return { error: "Invalid credentials!" };

    const token = sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    localStorage.setItem("token", token);
    setUser({ username });

    return { success: "Login successful!" };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
