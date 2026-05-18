from typing import TYPE_CHECKING
from datetime import date
from sqlalchemy import Date
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from app.database import Base

if TYPE_CHECKING:
    from app.models import MovieRole, SeriesRole, ActorRating


class Actor(Base):
    __tablename__ = "actors"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    name: Mapped[str] = mapped_column(String)

    surname: Mapped[str] = mapped_column(String)

    date_of_birth: Mapped[date] = mapped_column(Date)
    movie_roles: Mapped[list["MovieRole"]] = relationship(
        back_populates="actor", cascade="all, delete-orphan"
    )
    series_roles: Mapped[list["SeriesRole"]] = relationship(
        back_populates="actor", cascade="all, delete-orphan"
    )
    ratings: Mapped[list["ActorRating"]] = relationship(
        back_populates="actor", cascade="all, delete-orphan"
    )
