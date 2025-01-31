import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const PointsTask = () => {
  const [data, setData] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Upewnij się, że socketRef jest pusty przed nawiązaniem nowego połączenia
    if (!socketRef.current) {
      socketRef.current = io("https://strona-myzia-backend-production.up.railway.app", {
        transports: ["websocket"], // Wymuszenie użycia WebSocket
        reconnection: true, // Włączenie ponownego łączenia
        reconnectionAttempts: 5, // Liczba prób ponownego połączenia
        reconnectionDelay: 1000, // Opóźnienie między próbami
      });

      // Nasłuchiwanie na dane
      socketRef.current.on("taskData", (receivedData) => {
        console.log("📩 Otrzymano zadania:", receivedData);

        // Zapewniamy, że receivedData to tablica
        if (Array.isArray(receivedData)) {
          setData(receivedData);
        } else {
          console.error("❌ Otrzymane dane nie są tablicą:", receivedData);
        }
      });

      // Obsługa błędów
      socketRef.current.on("connect_error", (error) => {
        console.error("🚨 Błąd połączenia:", error);
      });

      socketRef.current.on("disconnect", () => {
        console.warn("⚠️ Połączenie WebSocket zostało zamknięte");
      });

      socketRef.current.on("reconnect", (attemptNumber) => {
        console.log(`🔄 Ponowne połączenie (próba ${attemptNumber})`);
      });
    }

    return () => {
      // Zamknięcie połączenia przy odmontowaniu komponentu
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("🛑 Połączenie WebSocket rozłączone");
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <ul>
        {data.length > 0 ? (
          data.map((item, index) => (
            <li key={index} className="m-2">
              <div className="bg-red-400 rounded flex items-center justify-center p-2 h-16 w-80">
                <p className="text-white font-bold">{item.tresc_myzio}</p>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-600">Brak danych do wyświetlenia</li>
        )}
      </ul>
    </div>
  );
};

export default PointsTask;
