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
        orm_mode = True
