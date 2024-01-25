import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { createContext } from "react";

export type UserContextType = {
  id: number;
  username: string;
  password: string;
};

function App() {
  const [activeUser, setActiveUSer] = useState<UserContextType>({
    id: 999,
    username: "",
    password: "",
  });

  const handleUserChange = (obj: Partial<UserContextType>) => {
    setActiveUSer((user) => ({ ...user, ...obj }));
  };

  return (
    <>
      <Router>
        <Navbar username={activeUser.username}></Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <LogIn onValueChange={handleUserChange} user={activeUser} />
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard user={activeUser} onValueChange={handleUserChange} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
