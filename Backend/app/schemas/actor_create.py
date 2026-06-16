from pydantic import BaseModel
from datetime import date


class ActorCreate(BaseModel):
    name: str
    surname: str
    date_of_birth: date
