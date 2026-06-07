from pydantic import BaseModel


class ReviewCreate(BaseModel):
    user_id: int
    reviewed_id: int
    value: int
