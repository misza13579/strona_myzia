import React, { useState, useEffect, useRef } from 'react';

const PointsTask = () => {
  const [data, setData] = useState([]);
  const wsRef = useRef(null); // Przechowujemy referencję do WebSocketa

  useEffect(() => {
    const connectWebSocket = () => {
      if (wsRef.current) {
        wsRef.current.close(); // Zamykamy stare połączenie, jeśli istnieje
      }

      wsRef.current = new WebSocket('wss://strona-myzia-backend-production.up.railway.app/wsTask');

      wsRef.current.onopen = () => {
        console.log('✅ WebSocket task połączony');
      };

      wsRef.current.onmessage = (event) => {
        console.log('📩 Otrzymano zadania:', event.data);
        try {
          const receivedData = JSON.parse(event.data);
          setData(receivedData);
        } catch (error) {
          console.error('❌ Błąd parsowania danych:', error);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('⚠️ WebSocket błąd:', error);
      };

      wsRef.current.onclose = () => {
        console.log("🔄 Połączenie WebSocket zerwane, ponawiam próbę...");
        setTimeout(connectWebSocket, 5000); // Automatyczne ponowne połączenie po 5s
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        console.log('🛑 WebSocket zamknięty');
      }
    };
  }, []);

  return (
    <div>
      <ul>
        {data.length > 0 ? (
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
