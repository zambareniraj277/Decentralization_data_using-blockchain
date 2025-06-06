import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSignup = () => {
    const result = signup(username, password);
    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage(result.success);
      setTimeout(() => navigate("/login"), 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="p-6 flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold">Sign Up</h2>
      {message && <p className="text-red-500">{message}</p>}
      <input
        type="text"
        placeholder="Username"
        className="border p-2 my-2 w-full rounded-md"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 my-2 w-full rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-green-500 text-white p-2 rounded-md"
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </motion.div>
  );
};

export default Signup;
