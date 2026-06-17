from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import Mapped
from sqlalchemy import UniqueConstraint
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from app.database import Base

if TYPE_CHECKING:
    from app.models import Series, User


class SeriesRating(Base):
    __tablename__ = "series_ratings"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    value: Mapped[int] = mapped_column(Integer)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    series_id: Mapped[int] = mapped_column(ForeignKey("series.id"))
    user: Mapped["User"] = relationship(back_populates="series_ratings")
    series: Mapped["Series"] = relationship(back_populates="ratings")
    __table_args__ = (UniqueConstraint("user_id", "series_id", name="uix_user_series"),
    )
