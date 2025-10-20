from typing import TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from pydantic import Optional

if TYPE_CHECKING:
    from .models_vehicle import Vehicle

class VehicleType(SQLModel, table = True):
    id_type : Optional[int] = Field(default = None, primary_key = True)
    name_type : str

    vehicles: list["Vehicle"] = Relationship(back_populates="vehicle_type")
