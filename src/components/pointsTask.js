import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const PointsTask = () => {
  const [data, setData] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Połączenie z serwerem Socket.IO
    socketRef.current = io("https://strona-myzia-backend-production.up.railway.app", {
        transports: ["websocket"], // Wymusza użycie WebSocket
        reconnection: true, // Włącza ponowne łączenie
        reconnectionAttempts: 5, // Ile razy próbować połączyć
        reconnectionDelay: 1000, // Czas między próbami
      });
    // Nasłuchiwanie na dane z serwera
    socketRef.current.on('taskData', (receivedData) => {
      console.log('📩 Otrzymano zadania:', receivedData);
      setData(receivedData);
    });

    // Obsługa błędów
    socketRef.current.on('connect_error', (error) => {
      console.error('Błąd połączenia:', error);
    });

    return () => {
      // Zamykanie połączenia przy unmountowaniu
        if (socketRef.current) {
          socketRef.current.disconnect();
          console.log('🛑 Połączenie z Socket.IO rozłączone');
        }
      }
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
