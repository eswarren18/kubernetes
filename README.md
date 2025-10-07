# Todo Fullstack (FastAPI + React + Docker)

## Prerequisits

kubectl kind k6

## Services

- **db**: Postgres database (port 15432)
- **api**: FastAPI backend (port 8000)
- **ui**: React dev server (port 5173)

## How it works

- The React app runs in dev mode (hot reload) at http://localhost:5173
- The API runs at http://localhost:8000
- The database is available at localhost:15432

## Run locally with Docker Compose

```bash
docker compose up --build
```

Then open [http://localhost:5173](http://localhost:5173) in your browser for the UI.
