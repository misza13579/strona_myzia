import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PointsTask from './pointsTask';

const Points = () => {
    const [zadanie_myzia, setZadanie_myzia] = useState('');
    const [zadanie_myzio, setZadanie_myzio] = useState('');
    const [punkty_myzia, setPunkty_myzia] = useState(0);
    const [punkty_myzio, setPunkty_myzio] = useState(0);
    const [connected, setConnected] = useState(false);
    const [data, setData] = useState({ myzia: 0, myzio: 0 });
    const wsRef = useRef(null);

    useEffect(() => {
        const connectWebSocket = () => {
            wsRef.current = new WebSocket('wss://strona-myzia-backend-production.up.railway.app/ws');

            wsRef.current.onopen = () => {
                console.log('Połączenie WebSocket otwarte');
                setConnected(true);
            };

            wsRef.current.onmessage = (event) => {
                console.log('Otrzymano dane:', event.data);
                setData(JSON.parse(event.data));
            };

            wsRef.current.onerror = (error) => {
                console.error('Błąd WebSocket:', error);
            };

            wsRef.current.onclose = () => {
                console.log('Połączenie WebSocket zamknięte');
                setConnected(false);
                setTimeout(connectWebSocket, 5000); // 🔄 Automatyczna ponowna próba po 5s
            };
        };

        connectWebSocket();

        return () => {
            if (wsRef.current) {
                wsRef.current.onclose = null;
                wsRef.current.close();
            }
        };
    }, []);


    const taskAdd_myzia = async (e) => {
      const token = localStorage.getItem('token');
      e.preventDefault();
  
        try {
          const response = await axios.post(`https://strona-myzia-backend-production.up.railway.app/points/add_myzia`, {zadanie_myzia, punkty_myzia },    
          {headers: {'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }});
        console.log('zadanie dodane', response);
      } catch (err) {
        console.error('Wystąpił błąd', err);
      }
    };

    const taskAdd_myzio = async (e) => {
      const token = localStorage.getItem('token');
      e.preventDefault();
  
        try {
          const response = await axios.post(`https://strona-myzia-backend-production.up.railway.app/points/add_myzio`, {zadanie_myzio, punkty_myzio },    
          {headers: {'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }});
        console.log('zadanie dodane', response);
      } catch (err) {
        console.error('Wystąpił błąd', err);
      }
    };
 
 

    return (
        <div className="grid grid-cols-3 grid-rows-3 font-myzia gap-3 h-[90%] justify-center rounded m-10 p-3 bg-red-300">
          
          <div className="flex items-center justify-center col-span-1">
          <div className="bg-red-200 h-32 w-64 rounded flex items-center justify-center">
            <p className="font-medium text-3xl">Punkty myzia:{data.myzia} </p>
            <p className="font-medium text-3xl"></p>
          </div>
          </div>

          <div className="flex items-center justify-center col-span-1">
          <div className="bg-red-200 h-32 w-64 rounded flex items-center justify-center">
            <p className="font-medium text-4xl">Licznik punktów{connected}</p>
          </div>

          </div>
          <div className="flex items-center justify-center col-span-1">
          <div className="bg-red-200 h-32 w-64 rounded flex items-center justify-center">
          <p className="font-medium text-3xl font-myzia">Punkty myzio:{data.myzio} </p>
          <p className="font-medium text-3xl font-myzia"></p>
          </div>
          </div>
    
          <div className="flex items-center justify-center h-96 col-span-1 rows-span-2">
            <div className="bg-red-200 h-96 w-84 rounded flex justify-center rows-span-2">
              <div className='bg-red-400 h-16 w-80 m-2 p-1 rounded flex items-center justify-center'>
                <form onSubmit={taskAdd_myzia} className='flex items-center justify-center  m-2 p-1 h-16 w-80'>
                <textarea type="text" placeholder="Zadanie" onChange={(e) => setZadanie_myzia(e.target.value)} className='border-5 w-48 h-12 m-1 rounded text-s border-red-500'></textarea>
                <input type="text" placeholder="" onChange={(e) => setPunkty_myzia(e.target.value)} className='border-5 w-8 h-14 m-2 text-2xl rounded-xl text-center border-red-500'></input>
                <button type="submit" className='bg-green-400 rounded w-24 h-14 text-xl m-2 p-2 text-zinc-200 font-myzia'>Dodaj</button>
                </form>
              </div>
            </div>
          </div>  

            <p></p>

          <div className="flex items-center justify-center h-96 p-2 col-span-1 rows-span-2">
            <div className="bg-red-200 h-96 w-84 rounded flex flex-col rows-span-2">
              <div className='bg-red-400 h-16 w-80 m-2 p-1 rounded flex items-center justify-center'>
                <form onSubmit={taskAdd_myzio} className='flex items-center justify-center  m-2 p-1 h-16 w-80'>
                <textarea type="text" placeholder="Zadanie" onChange={(e) => setZadanie_myzio(e.target.value)} className='border-5 w-48 h-12 m-1 rounded text-s border-red-500'></textarea>
                <input type="text" placeholder="" onChange={(e) => setPunkty_myzio(e.target.value)} className='border-5 w-8 h-14 m-2 text-2xl rounded-xl text-center border-red-500'></input>
                <button type="submit" className='bg-green-400 rounded w-24 h-14 text-xl m-2 p-2 text-zinc-200 font-myzia'>Dodaj</button>
                </form>
              </div>
              <PointsTask />
            </div>
          </div> 
        </div>
    );
};

export default Points;