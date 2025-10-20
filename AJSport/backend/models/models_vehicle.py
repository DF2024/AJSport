from typing import List
from sqlmodel import SQLModel, Field, Relationship
from pydantic import Optional

class Vehicle(SQLModel, table = True):
    id_vehicle : Optional[int]  = Field(default=None, primary_key=True)
    name_vehicle : str
    description_vehicle: str
    year_vehicle : int
    type_vehicle: str
    mileage_vehicle : int
    price_vehicle : float

    trademark_id : Optional[int] = Field(default = None, foreign_key="trademark.id_trademark")
    status_id : Optional[int] = Field(default = None, foreign_key="status.id_status")

    buy : List["Buy"] = Relationship(back_populates="vehicle")