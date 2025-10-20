from sqlmodel import SQLModel
from datetime import date
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .schema_user import UserRead
    from .schema_vehicle import VehicleRead

class BuyCreate(SQLModel):
    price : float
    id_user : int
    id_vehicle : int

class BuyRead(SQLModel):
    id_buy : int
    date_buy : date
    user: Optional["UserRead"] = None
    vehicle: Optional["VehicleRead"] = None

class BuyReadWithDetails(BuyRead):
    user: Optional["UserRead"] = None
    vehicle: Optional["VehicleRead"] = None

class BuyUpdate(SQLModel):
    price : Optional[float] = None
    id_user : Optional[int] = None
    id_vehicle : Optional[int] = None
