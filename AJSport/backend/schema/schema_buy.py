from sqlmodel import SQLModel
from datetime import date
from typing import Optional
from .user_schemas import UserRead  # Asegúrate de importar estos
from .vehicle_schemas import VehicleRead # Asegúrate de importar estos


class BuyCreate(SQLModel):
    price : float
    id_user : int
    id_vehicle : int

class BuyRead(SQLModel):
    id_buy : int
    date_buy : date
    user: Optional[UserRead] = None
    vehicle: Optional[VehicleRead] = None

class BuyReadWithDetails(BuyRead):
    user: Optional[UserRead] = None
    vehicle: Optional[VehicleRead] = None

class BuyUpdate(SQLModel):
    price : Optional[float] = None
    id_user : Optional[int] = None
    id_vehicle : Optional[int] = None
