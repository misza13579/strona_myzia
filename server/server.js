const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const app = express();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const PORT = 5000;

app.use(bodyParser.json()); 
app.use(cors());

// Ustawienia sesji
app.use(
  session({
      secret: 'supersekretnyklucz',
      resave: false,
      saveUninitialized: false,
      cookie: {
          maxAge: 24 * 60 * 60 * 1000, // Sesja trwa 24 godziny
      },
  })
);

// Middleware do weryfikacji tokenu
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Pobieramy token z nagłówka

  if (!token) {
      return res.status(403).send('Brak tokenu, dostęp zabroniony.');
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
          return res.status(403).send('Token jest nieprawidłowy lub wygasł.');
      }

      // Jeśli token jest poprawny, zapisz dane użytkownika w req.user
      req.user = decoded;  // decoded to dane zawarte w tokenie (np. userId)
      next();  // Przejdź do następnego middleware lub endpointu
  });
};


// Połączenie z bazą danych MySQL
const db = mysql.createConnection({
  host: 'localhost',     // Host bazy danych
  user: 'root',          // Nazwa użytkownika MySQL
  password: '1234',// Hasło do bazy
  database: 'strona_myzia'   // Nazwa bazy danych
});
// testowe połączenie z bazą danych
db.connect((err) => {
  if (err) {
      console.error('Błąd połączenia z bazą danych:', err.message);
      return;
  }
  console.log('Połączono z bazą danych MySQL!');
});

// Endpoint testowy
app.get('/', (req, res) => {
  res.send('server dziala' );
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

// Rejestracja użytkownika
app.post('/register', async (req, res) => {
  const { nick, email, password } = req.body;

  // Sprawdzanie, czy e-mail już istnieje w bazie danych
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) {
          console.error('Błąd bazy danych:', err);
          return res.status(500).send('Błąd serwera');
      }
      if (result.length > 0) {
          // Jeśli użytkownik z takim e-mailem już istnieje
          return res.status(400).send('Użytkownik z tym adresem e-mail już istnieje.');
      }

      // Hashowanie hasła
      const hashedPassword = await bcrypt.hash(password, 10);

      // Dodawanie nowego użytkownika do bazy danych
      db.query(
          'INSERT INTO users (nick, email, password) VALUES (?, ?, ?)',
          [nick, email, hashedPassword],
          (err, result) => {
              if (err) {
                  console.error('Błąd przy dodawaniu użytkownika:', err);
                  return res.status(500).send('Błąd serwera');
              }
              res.status(200).send('Rejestracja zakończona sukcesem!');
          }
      );
  });
});

// Logowanie użytkownika
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Wyszukiwanie użytkownika w bazie danych
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) {
          console.error('Błąd bazy danych:', err);
          return res.status(500).send('Błąd serwera');
      }
      if (result.length === 0) {
          // Jeśli nie znaleziono użytkownika
          return res.status(400).send('Nieprawidłowy e-mail lub hasło.');
      }

      // Porównanie hasła
      const isMatch = await bcrypt.compare(password, result[0].password);
      if (!isMatch) {
          return res.status(400).send('Nieprawidłowy e-mail lub hasło.');
      }

    app.get('/profile', authenticateToken, (req, res) => {
      // Teraz mamy dostęp do danych użytkownika w req.user (np. req.user.userId)
      db.query('SELECT * FROM users WHERE id = ?', [req.user.userId], (err, result) => {
          if (err) {
              console.error('Błąd bazy danych:', err);
              return res.status(500).send('Błąd serwera');
          }
          res.status(200).json(result[0]);  // Zwracamy dane użytkownika
      });
  });

  const token = jwt.sign(
    { userId: result[0].id },      // payload (dane, które chcesz zakodować w tokenie)
    'your_secret_key',             // sekret (musisz to zachować w tajemnicy)
    { expiresIn: '1h' }           // opcjonalnie możesz ustawić czas wygaśnięcia tokenu (np. 1 godzina)
  );
    res.status(200).json({ token });
});
  });