from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from app.database import Base

if TYPE_CHECKING:
    from app.models import Actor, User


class ActorRating(Base):

    __tablename__ = "actor_ratings"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    value: Mapped[int] = mapped_column(
        Integer
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    actor_id: Mapped[int] = mapped_column(
        ForeignKey("actors.id")
    )

    user: Mapped["User"] = relationship(
        back_populates="actor_ratings"
    )

    actor: Mapped["Actor"] = relationship(
        back_populates="ratings"
    )