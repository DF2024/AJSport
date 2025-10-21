from typing import TYPE_CHECKING, Optional
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime


if TYPE_CHECKING:
    from .models_users import User
    from .models_vehicle import Vehicle

class Buy(SQLModel, table = True):
    id_buy : Optional[int] = Field(default = None, primary_key = True)
    date_buy : datetime = Field(default_factory=datetime.utcnow)
    price: float | None = Field(default=None)

    id_user: int | None = Field(default=None, foreign_key="user.id_user")
    id_vehicle: int | None = Field(default=None, foreign_key="vehicle.id_vehicle")


    user: Optional["User"]  = Relationship(back_populates="buys")
    vehicle: Optional["Vehicle"] = Relationship(back_populates="buys")