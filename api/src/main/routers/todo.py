from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from ..schemas import todo as schemas
from ..models import todo as models
from ...db.session import get_db
from ...db import crud

router = APIRouter(prefix="/todos", tags=["Todo"])

# Health check endpoint
@router.get("/health", include_in_schema=False)
def health_check():
    return JSONResponse(content={"status": "ok"})

@router.get("/", response_model=list[schemas.TodoOut])
def read_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_todos(db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.TodoOut)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db, todo)

@router.delete("/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = crud.get_todo(db, todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    crud.delete_todo(db, db_todo)
    return {"ok": True}

@router.put("/{todo_id}", response_model=schemas.TodoOut)
def update_todo(todo_id: int, updates: schemas.TodoUpdate, db: Session = Depends(get_db)):
    db_todo = crud.get_todo(db, todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return crud.update_todo(db, db_todo, updates)
