import React from "react";
import Sidebar from "./components/sidebar";
import Days from "./components/days"; // Jeden z kafelków
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Pliki from "./components/pliki";
import Profile from "./components/profile";
import Login from "./components/login";
import Register from "./components/register";



const Mainpage = () => {
  const length = 60;
  const days = Array.from({length}, (_, index) => index + 1);
  return (
    <Router>
    <div className="flex">
      <div className="fixed">
        <Sidebar />
      </div> 
      <div className="flex-1 ml-64 h-screen bg-rose-200 p-2">
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/days" element={<Days days={days} />} />
        <Route path="/pliki" element={<Pliki/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
      <Analytics />
    </div>
    </Router>

  )
};

export default Mainpage;