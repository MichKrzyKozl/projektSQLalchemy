from typing import TYPE_CHECKING
from app.database import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from sqlalchemy import Integer

if TYPE_CHECKING:
    from app.models import Movie, User


class MovieRating(Base):
    __tablename__ = "movie_ratings"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    value: Mapped[int] = mapped_column(Integer)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=True,
    )
    movie_id: Mapped[int] = mapped_column(
        ForeignKey("movies.id"),
    )
    user: Mapped["User"] = relationship(  
        back_populates="movie_ratings",
    )
    movie: Mapped["Movie"] = relationship( 
        back_populates="ratings",
    )
