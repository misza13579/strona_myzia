import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import PointsTask from './pointsTask';

const Points = () => {
    const [zadanie_myzia, setZadanie_myzia] = useState('');
    const [zadanie_myzio, setZadanie_myzio] = useState('');
    const [punkty_myzia, setPunkty_myzia] = useState(0);
    const [punkty_myzio, setPunkty_myzio] = useState(0);
    const [connected, setConnected] = useState(false);
    const [data, setData] = useState({ myzia: 0, myzio: 0 });
    const socketRef = useRef(null);

    useEffect(() => {
        const connectSocket = () => {
            socketRef.current = io("https://strona-myzia-backend-production.up.railway.app", {
                transports: ["websocket"],
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 2000,
            });

            socketRef.current.on("connect", () => {
                console.log("✅ Połączono z Socket.IO!");
                setConnected(true);
            });

            socketRef.current.on("data", (message) => {
                console.log("📩 Otrzymano dane:", message);
                try {
                  const parsedMessage = JSON.parse(message);
                  console.log("📩 Parsed message:", parsedMessage); // Dodatkowy log
                  setData(parsedMessage);
                } catch (error) {
                  console.error("Błąd podczas parsowania JSON:", error);
                }
              });

            socketRef.current.on("disconnect", (reason) => {
                console.log("❌ Rozłączono:", reason);
                setConnected(false);
            });

            socketRef.current.on("connect_error", (error) => {
                console.error("❌ Błąd połączenia WebSocket:", error);
            });
        };

        connectSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        console.log("Aktualne dane:", data); // Dodaj to, by sprawdzić, czy dane są ustawione poprawnie
    }, [data]);

    const taskAdd_myzia = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post("https://strona-myzia-backend-production.up.railway.app/points/add_myzia",
                { zadanie_myzia, punkty_myzia },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log('✅ Zadanie dodane', response.data);
        } catch (err) {
            console.error('❌ Wystąpił błąd', err);
        }
    };

    const taskAdd_myzio = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post("https://strona-myzia-backend-production.up.railway.app/points/add_myzio",
                { zadanie_myzio, punkty_myzio },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log('✅ Zadanie dodane', response.data);
        } catch (err) {
            console.error('❌ Wystąpił błąd', err);
        }
    };

    return (
        <div className="grid grid-cols-3 grid-rows-3 font-myzia gap-3 h-[90%] justify-center rounded m-10 p-3 bg-red-300">
          
          <div className="flex items-center justify-center col-span-1">
              <div className="bg-red-200 h-32 w-64 rounded flex items-center justify-center">
                  <p className="font-medium text-3xl">Punkty myzia: {data[0].myzia}</p>
              </div>
          </div>

          <div className="flex items-center justify-center col-span-1">
              <div className="bg-red-200 h-32 w-64 rounded flex items-center justify-center">
                  <p className="font-medium text-4xl">Status: {connected ? "🟢 Połączony" : "🔴 Rozłączony"}</p>
              </div>
          </div>

          <div className="flex items-center justify-center col-span-1">
              <div className="bg-red-200 h-32 w-64 rounded flex items-center justify-center">
                  <p className="font-medium text-3xl">Punkty myzio: {data[0].myzia}</p>
              </div>
          </div>

          {/* Formularz myzia */}
          <div className="flex items-center justify-center h-96 col-span-1 rows-span-2">
              <div className="bg-red-200 h-96 w-84 rounded flex flex-col rows-span-2">
                  <div className='bg-red-400 h-16 w-80 m-2 p-1 rounded flex items-center justify-center'>
                      <form onSubmit={taskAdd_myzia} className='flex items-center justify-center m-2 p-1 h-16 w-80'>
                          <textarea placeholder="Zadanie" onChange={(e) => setZadanie_myzia(e.target.value)} className='border-5 w-48 h-12 m-1 rounded text-s border-red-500'></textarea>
                          <input type="number" placeholder="" onChange={(e) => setPunkty_myzia(e.target.value)} className='border-5 w-8 h-14 m-2 text-2xl rounded-xl text-center border-red-500'></input>
                          <button type="submit" className='bg-green-400 rounded w-24 h-14 text-xl m-2 p-2 text-zinc-200'>Dodaj</button>
                      </form>
                  </div>
                  <div className="flex-1 overflow-y-auto h-64 p-2">
                      <PointsTask osoba="myzia" />
                  </div>
              </div>
          </div>
          <p></p>
          {/* Formularz myzio */}
          <div className="flex items-center justify-center h-96 p-2 col-span-1 rows-span-2">
              <div className="bg-red-200 h-96 w-84 rounded flex flex-col rows-span-2">
                  <div className='bg-red-400 h-16 w-80 m-2 p-1 rounded flex items-center justify-center'>
                      <form onSubmit={taskAdd_myzio} className='flex items-center justify-center m-2 p-1 h-16 w-80'>
                          <textarea placeholder="Zadanie" onChange={(e) => setZadanie_myzio(e.target.value)} className='border-5 w-48 h-12 m-1 rounded text-s border-red-500'></textarea>
                          <input type="number" placeholder="" onChange={(e) => setPunkty_myzio(e.target.value)} className='border-5 w-8 h-14 m-2 text-2xl rounded-xl text-center border-red-500'></input>
                          <button type="submit" className='bg-green-400 rounded w-24 h-14 text-xl m-2 p-2 text-zinc-200'>Dodaj</button>
                      </form>
                  </div>
                  {/* Kontener z przewijaniem */}
                  <div className="flex-1 overflow-y-auto h-64 p-2">
                      <PointsTask osoba="myzio" />
                  </div>
              </div>
          </div>
        </div>
    );
};

export default Points;
