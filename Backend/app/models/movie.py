from typing import TYPE_CHECKING
from app.database import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from datetime import date
from sqlalchemy import Date
from sqlalchemy import Integer
from sqlalchemy import String

if TYPE_CHECKING:
    from app.models import MovieRating, MovieRole


class Movie(Base):
    __tablename__ = "movies"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String)
    category: Mapped[str] = mapped_column(String)
    release_date: Mapped[date] = mapped_column(Date)
    runtime_minutes: Mapped[int] = mapped_column(Integer)

    ratings: Mapped[list["MovieRating"]] = relationship(  
        back_populates="movie"
    )
    roles: Mapped[list["MovieRole"]] = relationship(
        back_populates="movie",
        cascade="all, delete-orphan"
    )