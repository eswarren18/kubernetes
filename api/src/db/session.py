from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

DATABASE_HOST = os.getenv("DATABASE_HOST", "localhost")
DATABASE_PORT = os.getenv("DATABASE_PORT", "5432")
DATABASE_USER = os.getenv("DATABASE_USER", "todo_user")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD", "todo_pass")
DATABASE_NAME = os.getenv("DATABASE_NAME", "todo_db")

DATABASE_URL = (
    f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"
)

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
