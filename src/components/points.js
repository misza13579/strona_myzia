import React, { useState, useEffect, useCallback  } from 'react';
import axios from 'axios';
//import PointsTask from './pointsTask';

const Points = () => {

    const [zadanie_myzio, setZadanie_myzio] = useState('');
    const [zadanie_myzia, setZadanie_myzia] = useState('');
    const [punkty_myzia, setPunkty_myzia] = useState(0);
    const [punkty_myzio, setPunkty_myzio] = useState(0);
    const [data, setData] = useState({ myzia: 0, myzio: 0 });


    const connectWebSocket = useCallback(() => {
      let ws = new WebSocket('wss://strona-myzia-backend-production.up.railway.app/ws');
      let pongTimeout;
      const PONG_TIMEOUT = 5000; // 5 sekund na odpowiedź na ping
      const PING_INTERVAL = 30000; // Wysyłanie ping co 30 sekund
    
      // Funkcja do wysyłania ping
      const sendPing = () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send('ping');  // Możesz wysłać niestandardowy ping
          console.log('Wysyłam ping do serwera');
        }
      };
    
      // Ustawienie interwału wysyłania pingów
      const pingInterval = setInterval(sendPing, PING_INTERVAL);
    
      // Obsługuje otwarcie połączenia
      ws.onopen = () => {
        console.log('WebSocket połączony');
      };
    
      // Obsługuje wiadomości od serwera
      ws.onmessage = (event) => {
        console.log('Otrzymano dane: ', event.data);
        const receivedData = JSON.parse(event.data);
        setData(receivedData);  // Aktualizujemy stan danymi z serwera
      };
    
      // Obsługuje błędy WebSocket
      ws.onerror = (error) => {
        console.error('Błąd WebSocket:', error);
      };
    
      // Obsługuje zamknięcie połączenia
      ws.onclose = () => {
        console.log("Połączenie WebSocket zerwane, ponawiam próbę...");
        console.log("Stan połączenia: ", ws.readyState);
        clearInterval(pingInterval);  // Czyszczenie interwału pingów
    
        // Próba ponownego połączenia po 5 sekundach
        setTimeout(() => {
          connectWebSocket();  // Ponowne wywołanie funkcji łączenia
        }, 5000);
      };
    
      // Obsługuje odpowiedź na ping (po stronie klienta)
      ws.onmessage = (event) => {
        if (event.data === 'pong') {
          console.log('Otrzymano pong od serwera');
          clearTimeout(pongTimeout);  // Resetujemy timeout
        }
      };
    
      // Wysyłanie pong, jeśli otrzymamy ping
      ws.onmessage = (event) => {
        if (event.data === 'ping') {
          console.log('Otrzymano ping, wysyłam pong');
          ws.send('pong');
        }
      };
    
      // Funkcja czyszcząca połączenie, kiedy komponent jest odmontowywany
      return () => {
        if (ws) {
          clearInterval(pingInterval);  // Zatrzymanie interwału pingów
          ws.close();  // Zamknięcie połączenia WebSocket
          console.log('WebSocket zamknięty');
        }
      };
    }, []);
      
    useEffect(() => {
      const wss = connectWebSocket();
      
      // Cleanup funkcji w useEffect, aby zamknąć połączenie, gdy komponent zostanie odmontowany
      return () => {
        if (wss) {
          wss();  // Zamknięcie połączenia i czyszczenie
        }
      };
    }, [connectWebSocket]);
    
  

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
            <p className="font-medium text-3xl">Punkty myzia: </p>
            <p className="font-medium text-3xl">{data.myzia}</p>
          </div>
          </div>

          <div className="flex items-center justify-center col-span-1">
          <div className="bg-red-200 h-32 w-64 rounded flex items-center justify-center">
            <p className="font-medium text-4xl">Licznik punktów</p>
          </div>

          </div>
          <div className="flex items-center justify-center col-span-1">
          <div className="bg-red-200 h-32 w-64 rounded flex items-center justify-center">
          <p className="font-medium text-3xl font-myzia">Punkty myzio: </p>
          <p className="font-medium text-3xl font-myzia">{data.myzio}</p>
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
            </div>
          </div> 
        </div>
    );
}

export default Points;