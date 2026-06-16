from pydantic import BaseModel


class SeriesRoleCreate(BaseModel):
    character_name: str
    actor_id: int
    series_id: int
