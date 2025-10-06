from fastapi import FastAPI
from .routers import todo
from ..db.session import engine
from ..main.models.todo import Base

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(todo.router)
