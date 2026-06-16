from pydantic import BaseModel
from datetime import date


class SeriesCreate(BaseModel):
    title: str
    category: str
    release_date: date
    seasons: int
