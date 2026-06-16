from pydantic import BaseModel
from datetime import date


class MovieCreate(BaseModel):
    title: str
    category: str
    release_date: date
    runtime_minutes: int
