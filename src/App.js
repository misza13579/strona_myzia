import React from "react";
import Sidebar from "./components/sidebar";
import Days from "./components/days"; // Jeden z kafelków
import { Analytics } from "@vercel/analytics/react"

const Mainpage = () => {
  const length = 60;
  const days = Array.from({length}, (_, index) => index + 1);
  return (
    <div className="flex ">
      <div className="fixed"><Sidebar /></div> 
      <div className="flex-1 ml-64 min-h-screen bg-rose-200 p-2">
      <div><Days days={days}/></div>
      </div>
      <Analytics />
    </div>

  )
};

export default Mainpage;