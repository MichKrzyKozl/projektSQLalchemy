from __future__ import annotations

from typing import TYPE_CHECKING

from app.database import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy import String
from sqlalchemy.orm import relationship

if TYPE_CHECKING:
    from app.models import (
        ActorRating,
        MovieRating,
        SeriesRating,
        MovieRoleRating,
        SeriesRoleRating,
    )


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String)
    actor_ratings: Mapped[list["ActorRating"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    movie_ratings: Mapped[list["MovieRating"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    series_ratings: Mapped[list["SeriesRating"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    movie_role_ratings: Mapped[list["MovieRoleRating"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    series_role_ratings: Mapped[list["SeriesRoleRating"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
