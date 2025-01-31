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

      if (Array.isArray(receivedData)) {
        // Filtrowanie nieprawidłowych danych
        const filteredData = receivedData.filter(
          item => (item.tresc_myzia && item.tresc_myzia.trim()) || (item.tresc_myzio && item.tresc_myzio.trim())
        );

        setData(filteredData);
      } else {
        console.error("🚨 Otrzymano nieprawidłowe dane (oczekiwano tablicy):", receivedData);
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
