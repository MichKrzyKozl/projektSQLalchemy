from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from app.database import Base

if TYPE_CHECKING:
    from app.models import Actor, Movie, MovieRoleRating


class MovieRole(Base):

    __tablename__ = "movie_roles"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    character_name: Mapped[str] = mapped_column(
        String
    )

    actor_id: Mapped[int] = mapped_column(
        ForeignKey("actors.id")
    )

    movie_id: Mapped[int] = mapped_column(
        ForeignKey("movies.id")
    )

    actor: Mapped["Actor"] = relationship(
        back_populates="movie_roles"
    )
    movie: Mapped["Movie"] = relationship(back_populates="roles")

    ratings: Mapped[list["MovieRoleRating"]] = relationship(
        back_populates="role",
        cascade="all, delete-orphan"
    )