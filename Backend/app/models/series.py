from __future__ import annotations

from typing import TYPE_CHECKING

from datetime import date

from sqlalchemy import Date
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from app.database import Base

if TYPE_CHECKING:
    from app.models import SeriesRating, SeriesRole

class Series(Base):
    __tablename__ = "series"
    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )
    title: Mapped[str] = mapped_column(String)
    release_date: Mapped[date] = mapped_column(Date)
    seasons: Mapped[int] = mapped_column(Integer)
    ratings: Mapped[list["SeriesRating"]] = relationship(  
        back_populates="series",
        cascade="all, delete-orphan"
    )
    roles: Mapped[list["SeriesRole"]] = relationship(
        back_populates="series",
        cascade="all, delete-orphan"
    )