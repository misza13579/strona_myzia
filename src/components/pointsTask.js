import React, { useState, useEffect, useCallback  } from 'react';

const PointsTask = () => {
const [data, setData] = useState([]);

const connectWebSocket = useCallback(() => {
      const ws = new WebSocket('wss://strona-myzia-backend-production.up.railway.app:443/ws/Task');
    
      ws.onopen = () => {
        console.log(' WebSocket połączony');
      };
  
      ws.onmessage = (event) => {
        console.log('Otrzymano zadania: ', event.data);  // Dodaj logowanie dla otrzymanych danych
        const receivedData = JSON.parse(event.data);
        setData(receivedData);  // Aktualizujemy stan danymi z serwera
      };
    
      ws.onclose = () => {
        console.log("Połączenie WebSocket zerwane, ponawiam próbę...");
        setTimeout(connectWebSocket, 5000); // Próba ponownego połączenia po 5s
      };

      return () => ws.close();

    }, []);
    
    useEffect(() => {
      connectWebSocket();
    }, [connectWebSocket]);




    return (
    <div>
        <ul>
        {data.map((data, index) => (
          
          <li key={index}>
            <div className='bg-red-400 rounded flex items-center justify-center m-2 p-1 h-16 w-80'>
        <p className='border-5 w-8 h-14 m-2 text-2xl rounded-xl text-center border-red-500'>
        {data.tresc_myzio}aa
        </p>
        
        <p className='border-5 w-8 h-14 m-2 text-2xl rounded-xl text-center border-red-500'>

        </p>
      </div>
            </li>
        ))}
                <div className='bg-red-400 rounded flex items-center justify-center m-2 p-1 h-16 w-80'>
        <p className='border-5 w-8 h-14 m-2 text-2xl rounded-xl text-center border-red-500'>
        
        </p>
        
        <p className='border-5 w-8 h-14 m-2 text-2xl rounded-xl text-center border-red-500'>

        </p>
      </div>
      </ul>
    </div>
        
    );
};

export default PointsTask;