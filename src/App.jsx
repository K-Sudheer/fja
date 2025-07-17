import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Todo from "./pages/Todo";
import '../src/App.css'

const App = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/todo" element={<ProtectedRoute>
                <Todo />
            </ProtectedRoute>} />
        </Routes>
        </>
    )
}

export default App;