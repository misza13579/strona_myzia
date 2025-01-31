import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const PointsTask = () => {
  const [data, setData] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("https://strona-myzia-backend-production.up.railway.app", {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on("task", (receivedData) => {
        console.log("📩 Otrzymano zadania:", receivedData);

        // Sprawdzamy, czy otrzymane dane są obiektem
        if (typeof receivedData === 'object' && !Array.isArray(receivedData)) {
          setData(receivedData); // Jeśli dane to obiekt, ustawiamy je w stanie
        } else {
          console.error("❌ Otrzymane dane nie są obiektem");
        }
      });

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
        {Object.entries(data).length > 0 ? (
          // Iteracja po obiekcie za pomocą Object.entries
          Object.entries(data).map(([key, value], index) => (
            <li key={index} className="m-2">
              <div className="bg-red-400 rounded flex items-center justify-center p-2 h-16 w-80">
                <pre className="text-white font-bold">
                  {key}: {JSON.stringify(value, null, 2)}
                </pre>
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
