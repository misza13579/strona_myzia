import React from "react";
import Sidebar from "./components/sidebar";
import Days from "./components/days"; // Jeden z kafelków
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pliki from "./components/pliki";


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
        <Route path="/days" element={<Days days={days} />} />
        <Route path="/pliki" element={<Pliki/>}/>
        </Routes>
      </div>
      <Analytics />
    </div>
    </Router>

  )
};

export default Mainpage;