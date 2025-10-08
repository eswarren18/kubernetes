from pydantic import BaseModel
from typing import Optional

class TodoBase(BaseModel):
    title: str
    completed: Optional[bool] = False

class TodoCreate(TodoBase):
    pass

class TodoOut(TodoBase):
    id: int
    class Config:
        from_attributes = True

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None
