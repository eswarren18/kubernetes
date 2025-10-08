
import sys
print("[DEBUG] main.py loaded", file=sys.stderr)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import todo
from ..db.session import engine
from ..main.models.todo import Base


print("[DEBUG] Creating FastAPI app", file=sys.stderr)
app = FastAPI()


print("[DEBUG] Adding CORS middleware", file=sys.stderr)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


print("[DEBUG] Creating tables", file=sys.stderr)
Base.metadata.create_all(bind=engine)


print("[DEBUG] Including routers", file=sys.stderr)
app.include_router(todo.router, prefix="/api")

@app.on_event("startup")
async def on_startup():
    print("[DEBUG] FastAPI startup event", file=sys.stderr)

@app.on_event("shutdown")
async def on_shutdown():
    print("[DEBUG] FastAPI shutdown event", file=sys.stderr)
