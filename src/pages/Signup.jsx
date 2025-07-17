import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
 
const Signup = () => {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
 
    try {
      await signup(name, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };
 
  return (
    <div>
        <form onSubmit={handleSubmit}>
         <h2>Signup</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          /><br />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          /><br />
          <button type="submit">Signup</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    </div>
  );
};
 
export default Signup;
 