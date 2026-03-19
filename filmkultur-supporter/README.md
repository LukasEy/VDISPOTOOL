# Filmkultur SH Unterstützer-App

A full-stack web app for collecting supporters for the Filmkultur Schleswig-Holstein policy paper.

## Tech Stack

- **Frontend:** React + Tailwind CSS (Vite)
- **Backend:** Node.js + Express
- **Database:** SQLite via better-sqlite3

## Local Setup

### Prerequisites
- Node.js 18+

### Install & Run

```bash
# From the project root (filmkultur-supporter/)
npm install         # installs root + server + client deps
npm run dev         # starts both backend (port 3001) and frontend (port 5173)
```

Open [http://localhost:5173](http://localhost:5173)

The frontend proxies `/api/*` requests to the backend automatically in dev mode.

### Production Build

```bash
npm run build       # builds React app into client/dist/
npm start           # serves everything from Express on PORT (default 3001)
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Port for the Express server |
| `DB_PATH` | `./server/supporters.db` | Path to SQLite database file |
| `CORS_ORIGIN` | `*` | Allowed CORS origin (set to your domain in production) |
| `IP_SALT` | `filmkultur-sh-2026` | Salt for IP hashing (change in production) |
| `NODE_ENV` | — | Set to `production` to serve frontend from Express |

## Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

### One-click Railway deploy:

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. Select the repo and set the **Root Directory** to `filmkultur-supporter`
4. Railway auto-detects Node.js. Set these environment variables:
   - `NODE_ENV=production`
   - `PORT=3001` (Railway sets this automatically)
   - `IP_SALT=<your-random-secret>`
   - `CORS_ORIGIN=https://your-domain.railway.app`
5. Set the **Build Command:** `npm run build`
6. Set the **Start Command:** `npm start`
7. Add a **Volume** mounted at `/app/server` to persist the SQLite database

### Deploy to Render

1. New **Web Service** → connect your GitHub repo
2. Root directory: `filmkultur-supporter`
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add environment variables as above
6. Add a **Disk** mounted at `/app/server` (for SQLite persistence)
