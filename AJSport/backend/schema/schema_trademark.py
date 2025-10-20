from sqlmodel import SQLModel
from typing import List
from .vehicle_schemas import VehicleRead # Importación necesaria

class TrademarkBase(SQLModel):
    name_trademark : str

class TrademarkCreate(TrademarkBase):
    pass

class TrademarkRead(TrademarkBase):
    id_trademark: int

class TrademarkReadWithVehicles(TrademarkRead):
    vehicles: List[VehicleRead] = []
