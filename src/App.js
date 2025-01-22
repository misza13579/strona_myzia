import React from "react";
import Sidebar from "./components/sidebar";
import Days from "./components/days"; // Jeden z kafelków
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Route, Routes, useLocation  } from 'react-router-dom';
import Pliki from "./components/pliki";
import Profile from "./components/profile";
import Login from "./components/login";
import Register from "./components/register";
import Points from "./components/points";
const Mainpage = () => {
  const length = 60;
  const days = Array.from({length}, (_, index) => index + 1);

  const Content = () => {
    const location = useLocation();
    const hideSidebar = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

    return (
      <div className="flex">
        {!hideSidebar && (
          <div className="fixed">
            <Sidebar />
          </div>
        )}
        <div className={`flex-1 ${hideSidebar ? "ml-0" : "ml-64"} h-screen bg-rose-200 p-2`}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/days" element={<Days days={days} />} />
            <Route path="/pliki" element={<Pliki />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/points" element={<Points />} />
          </Routes>
        </div>
        <Analytics />
      </div>
    );
  };


  return (
    <Router>
      <Content />
    </Router>
  );
};

export default Mainpage;