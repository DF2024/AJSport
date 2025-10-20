from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from .models_vehicle import Vehicle

class Status(SQLModel, table = True):
    id_status : Optional[int] = Field(default = None, primary_key = True)
    status : str

    vehicles: list["Vehicle"] = Relationship(back_populates="status")