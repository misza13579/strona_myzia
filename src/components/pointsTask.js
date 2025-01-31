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
      socketRef.current.on("task", (receivedData) => {
        console.log("📩 Otrzymano zadania:", receivedData);

        // Sprawdzenie, czy dane są tablicą
        if (Array.isArray(receivedData)) {
          // Filtrujemy dane, aby usunąć te, które mają null lub puste wartości w "tresc_myzia"
          const filteredData = receivedData.filter(
            (item) => item.tresc_myzia && item.tresc_myzia.trim() !== ""
          );

          if (filteredData.length > 0) {
            setData(filteredData);
          } else {
            console.error("❌ Brak danych do wyświetlenia (wszystkie pola null lub puste)");
          }
        } else {
          console.error("❌ Otrzymane dane mają niewłaściwy format:", receivedData);
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
                <p className="text-white font-bold">
                  {item.tresc_myzia || item.tresc_myzio || "Brak treści"}
                </p>
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
