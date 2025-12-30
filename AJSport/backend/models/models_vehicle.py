from typing import TYPE_CHECKING, Optional
from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .models_trademark import Trademark
    from .models_status import Status
    from .models_type import VehicleType
    from .models_buy import Buy


class Vehicle(SQLModel, table = True):
    id_vehicle : Optional[int]  = Field(default=None, primary_key=True)
    name_vehicle : str
    description_vehicle: str
    year_vehicle : int
    mileage_vehicle : int
    price_vehicle : float
    image_path: Optional[str] = Field(default=None)


    trademark_id : Optional[int] = Field(default = None, foreign_key="trademark.id_trademark")
    status_id : Optional[int] = Field(default = None, foreign_key="status.id_status")
    type_id: Optional[int] = Field(default = None, foreign_key = "vehicletype.id_type")


    trademark: Optional["Trademark"] = Relationship(back_populates="vehicles")
    status: Optional["Status"] = Relationship(back_populates="vehicles")
    vehicle_type: Optional["VehicleType"] = Relationship(back_populates="vehicles")
    buys: list["Buy"] = Relationship(back_populates="vehicle")