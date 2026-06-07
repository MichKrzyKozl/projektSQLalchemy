from __future__ import annotations
from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from app.database import Base

if TYPE_CHECKING:
    from app.models import Actor, Series, SeriesRoleRating


class SeriesRole(Base):
    __tablename__ = "series_roles"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    character_name: Mapped[str] = mapped_column(String)

    actor_id: Mapped[int] = mapped_column(ForeignKey("actors.id"))

    series_id: Mapped[int] = mapped_column(ForeignKey("series.id"))

    actor: Mapped["Actor"] = relationship(back_populates="series_roles")
    series: Mapped["Series"] = relationship(back_populates="roles")

    ratings: Mapped[list["SeriesRoleRating"]] = relationship(
        back_populates="role", cascade="all, delete-orphan"
    )
