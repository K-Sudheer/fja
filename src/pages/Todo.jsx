import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
 
const Todo = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
 
  useEffect(() => {
    if (!user?.email) return;
 
    const key = `todos_${user.email}`;
    const stored = localStorage.getItem(key);
 
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("Loaded todos:", parsed);
      setTodos(parsed);
    } else {
      console.log("No todos found for this user");

      setTodos([]);
    }
 
    setLoaded(true);
  }, [user?.email]);
 
  useEffect(() => {
    if (!user?.email || !loaded) return;
 
    const key = `todos_${user.email}`;
    localStorage.setItem(key, JSON.stringify(todos));
    console.log("Saved todos:", todos);
  }, [todos, user?.email, loaded]);
 
  const handleAdd = () => {
    if (!input.trim()) {
      setError("Todo cannot be empty!");
      return;
    }
 
    const updated = [...todos, input];
    setTodos(updated);
    setInput("");
    setError("");
  };
 
  const handleDelete = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };
 
  const handleLogout = () => {
    setTodos([]);
    logout();
  };
 
  if (!user) return <p>Loading user...</p>;
 
  return (
    <div className="todo-container">
      <div className="header">
        <h2>Welcome, {user.name}</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add todo"
        />
        <button onClick={handleAdd}>Add</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
 
      <ul className="todo-list">
        {todos.map((todo, i) => (
          <li key={i}>
            {todo}{" "}
            <button onClick={() => handleDelete(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
 
export default Todo;
 