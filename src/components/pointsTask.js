import React, { useState, useEffect, useRef } from 'react';

const PointsTask = () => {
  const [data, setData] = useState([]);
  const wsRef = useRef(null);
  const reconnectTimeout = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {


      console.log("🔄 Nawiązywanie nowego połączenia WebSocket...");
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
        console.log("🔄 Połączenie WebSocket zerwane, ponawiam próbę za 5 sekund...");
        reconnectTimeout.current = setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        console.log("🛑 Zamykam WebSocket przy unmountowaniu");
        wsRef.current = null;
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
        reconnectTimeout.current = null;
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
