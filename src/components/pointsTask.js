import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const PointsTask = () => {
  const [data, setData] = useState([]);
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
        setData(message);
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
        {data.length > 0 ? (
          // Iteracja po tablicy za pomocą map
          data.map((item, index) => (
            <li key={index} className="m-2">
              <div className="bg-red-400 rounded flex items-center justify-center p-2 h-16 w-80">
                <pre className="text-white font-bold">
                  {JSON.stringify(item, null, 2)}
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
