from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy import Integer

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database import Base

if TYPE_CHECKING:
    from app.models import SeriesRole, User


class SeriesRoleRating(Base):
    __tablename__ = "series_role_ratings"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    value: Mapped[int] = mapped_column(Integer)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    role_id: Mapped[int] = mapped_column(ForeignKey("series_roles.id"))

    user: Mapped["User"] = relationship(back_populates="series_role_ratings")

    role: Mapped["SeriesRole"] = relationship(back_populates="ratings")
