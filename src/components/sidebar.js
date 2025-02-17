import React from "react";
import kotki1 from "../kotki1.png"
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="top-0 font-myzia left-0 h-screen w-64 
    shadow-lq bg-main_1 text-white">
        
      <img className="left-5 top-5 w-32 shadow-xs  " src={kotki1} alt="hihihi"></img>
      <ul>
        <li><Link to="/days">Plan</Link></li>
        <li><Link to="/pliki">Pliki</Link></li>
        <li><Link to="/profile">Profil</Link></li>
        <li><Link to="/points">Punkty</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;  
