const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'supporters.db');

// Database setup
const db = new Database(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS supporters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    funktion TEXT NOT NULL,
    organisation TEXT,
    timestamp INTEGER NOT NULL,
    ip_hash TEXT NOT NULL
  )
`);

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// Rate limiter: 1 submission per hashed IP per hour
// We track this ourselves in the DB rather than memory to survive restarts
const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1,
  keyGenerator: (req) => hashIP(req.ip || req.connection.remoteAddress || 'unknown'),
  message: { error: 'Sie haben bereits eine Unterstützung eingereicht. Bitte warten Sie eine Stunde.' },
  standardHeaders: true,
  legacyHeaders: false,
});

function hashIP(ip) {
  return crypto.createHash('sha256').update(ip + (process.env.IP_SALT || 'filmkultur-sh-2026')).digest('hex');
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/<[^>]*>/g, '').substring(0, 100);
}

// GET /api/supporters
app.get('/api/supporters', (req, res) => {
  const rows = db.prepare('SELECT id, name, funktion, organisation, timestamp FROM supporters ORDER BY timestamp DESC').all();
  res.json({ count: rows.length, supporters: rows });
});

// POST /api/supporters
app.post('/api/supporters', rateLimitMiddleware, (req, res) => {
  const { name, funktion, organisation, dsgvo } = req.body;

  if (!dsgvo) {
    return res.status(400).json({ error: 'Bitte stimmen Sie der Datenschutzerklärung zu.' });
  }

  const cleanName = sanitize(name);
  const cleanFunktion = sanitize(funktion);
  const cleanOrganisation = sanitize(organisation || '');

  if (!cleanName || cleanName.length < 2) {
    return res.status(400).json({ error: 'Bitte geben Sie Ihren vollständigen Namen ein (min. 2 Zeichen).' });
  }
  if (!cleanFunktion || cleanFunktion.length < 2) {
    return res.status(400).json({ error: 'Bitte geben Sie Ihre Funktion ein (min. 2 Zeichen).' });
  }

  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const ipHash = hashIP(ip);
  const timestamp = Date.now();

  const stmt = db.prepare('INSERT INTO supporters (name, funktion, organisation, timestamp, ip_hash) VALUES (?, ?, ?, ?, ?)');
  const result = stmt.run(cleanName, cleanFunktion, cleanOrganisation || null, timestamp, ipHash);

  res.status(201).json({ id: result.lastInsertRowid, name: cleanName, funktion: cleanFunktion, organisation: cleanOrganisation || null, timestamp });
});

// Catch-all for SPA in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
