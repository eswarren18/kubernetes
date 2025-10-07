from sqlalchemy.orm import Session
from ..main.models import todo as models
from ..main.schemas import todo as schemas

def get_todo(db: Session, todo_id: int):
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()

def get_todos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Todo).offset(skip).limit(limit).all()

def create_todo(db: Session, todo: schemas.TodoCreate):
    db_todo = models.Todo(title=todo.title, completed=todo.completed)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def delete_todo(db: Session, db_todo: models.Todo):
    db.delete(db_todo)
    db.commit()
    return True

def update_todo(db: Session, db_todo: models.Todo, updates: schemas.TodoBase):
    if updates.title is not None:
        db_todo.title = updates.title
    if updates.completed is not None:
        db_todo.completed = updates.completed
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo
