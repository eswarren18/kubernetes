from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import todo
from ..db.session import engine
from ..main.models.todo import Base

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(todo.router, prefix="/api")
