const express = require('express');
const app = express();
const port = 3000;

const auth = { login: 'Dampf', password: 'DampfKraftMMMA' };

// Basic Auth Middleware — MUSS ganz oben stehen, vor express.static
app.use((req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const base64Credentials = authHeader.split(' ')[1] || '';
  const [user, pass] = Buffer.from(base64Credentials, 'base64').toString().split(':');

  if (user === auth.login && pass === auth.password) {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm="Geschützt"');
  res.status(401).send('Zugriff verweigert');
});

// Statische Dateien ausliefern
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

