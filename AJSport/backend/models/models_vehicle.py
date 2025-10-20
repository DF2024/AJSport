from sqlmodel import SQLModel, Field
from pydantic import Optional

class Vehicle(SQLModel, table = True):
    id_vehicle : Optional[int]  = Field(default=None, primary_key=True)
    id_trademark: int
    name_vehicle : str
    description_vehicle: str
    year_vehicle : int
    type_vehicle: str
    status_vehicle : str
    mileage_vehicle : int
    price_vehicle : float

