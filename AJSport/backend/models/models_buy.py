from typing import TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from pydantic import Optional
from datetime import date

if TYPE_CHECKING:
    from .user import User
    from .vehicle import Vehicle

class Buy(SQLModel, table = True):
    id_buy : Optional[int] = Field(default = None, primary_key = True)
    date_buy : date
    price: float | None = Field(default=None)

    id_user: int | None = Field(default=None, foreign_key="user.id_user")
    id_vehicle: int | None = Field(default=None, foreign_key="vehicle.id_vehicle")


    user: "User" | None = Relationship(back_populates="buys")
    vehicle: "Vehicle" | None = Relationship(back_populates="buys")