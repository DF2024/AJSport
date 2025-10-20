from sqlmodel import SQLModel
from typing import List
from typing import List, TYPE_CHECKING # Importa TYPE_CHECKING


if TYPE_CHECKING:
    from .schema_vehicle import VehicleRead

class TrademarkBase(SQLModel):
    name_trademark : str

class TrademarkCreate(TrademarkBase):
    pass

class TrademarkRead(TrademarkBase):
    id_trademark: int

class TrademarkReadWithVehicles(TrademarkRead):
    vehicles: List["VehicleRead"] = []


