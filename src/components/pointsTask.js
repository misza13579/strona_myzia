import React, { useState, useEffect, useCallback } from 'react';

const PointsTask = () => {
  const [data, setData] = useState([]);

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket('wss://strona-myzia-backend-production.up.railway.app/wsTask');

    ws.onopen = () => {
      console.log('WebSocket task połączony');
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

    // Funkcja do zamknięcia połączenia
    return () => ws.close();

  }, []);

  useEffect(() => {
    connectWebSocket();
  }, [connectWebSocket]);

  return (
    <div>
      <ul>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <li key={index}>
              <div className='bg-red-400 rounded flex items-center justify-center m-2 p-1 h-16 w-80'>
                <p className='border-5 w-8 h-14 m-2 text-2xl rounded-xl text-center border-red-500'>
                  {item.tresc_myzio}
                </p>
              </div>
            </li>
          ))
        ) : (
          <li>Brak danych do wyświetlenia</li>
        )}
      </ul>
    </div>
  );
};

export default PointsTask;
