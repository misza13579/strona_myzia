const express = require('express');
const cors = require('cors'); // Middleware do obsługi CORS
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Pozwala na komunikację z innymi domenami
app.use(express.json()); // Parsowanie JSON w żądaniach

// Endpoint testowy
app.get('/api/message', (req, res) => {
  res.json({ message: 'Witaj z serwera Node.js!' });
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});