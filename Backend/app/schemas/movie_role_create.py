from pydantic import BaseModel


class MovieRoleCreate(BaseModel):
    character_name: str
    actor_id: int
    movie_id: int
