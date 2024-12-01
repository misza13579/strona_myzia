import React, { useEffect, useState } from "react";
import quest from "./days_questions.json";

const Days = ({days}) => {
  const daysPerSide = 12;
  const [curentSide, setCurentSide] = useState(1);
  const [text, setText] = useState([]);
  
  const totalSide = Math.ceil(days.length / daysPerSide);

  useEffect(() => {
    setText(quest.questions);
  },[]);

  const next_side = () =>{
    if (curentSide===totalSide) return;
    setCurentSide(curentSide + 1);
  }
  const pre_side = () =>{
    if (curentSide===1) return;
    setCurentSide(curentSide - 1);
  }
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-8 m-20 place-items-center">
       {days.map((day, index) => (
          <div 
          key = {index}
          className={`p-4 bg-main_2 h-32 w-40 shadow-md border rounded-md transition-all ${
            Math.floor(index / daysPerSide) + 1 === curentSide ? "block" : "hidden"
          }`}
          >
          <h1 className="text-sm">Dzień {day}</h1>
          <p className="text-xs">{text[index] || "Brak pytania"}</p>

            </div>
        ))}
      </div>
      <div className="flex justify-center items-center space-x-10">
        <button
        onClick={pre_side}
        className={`rounded-md px-4 py-2 ${curentSide === 1 ? "bg-red-300 opacity-50 cursor-not-allowed": "bg-red-300 hover:bg-red-400"}`}
        disabled={curentSide === 1}
        >
        Poprzednia  
        </button>
        <button
        onClick={next_side}
        className={`rounded-md px-4 py-2 ${curentSide === totalSide ? "bg-red-300 opacity-50 cursor-not-allowed":"bg-red-300 hover:bg-red-400"}`}
        disabled={curentSide === totalSide}
        >
        Następna  
        </button>
      </div>
    </div>
  )
};

export default Days;  