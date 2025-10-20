from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel

if TYPE_CHECKING:
    from .schema_trademark import TrademarkRead
    from .schema_status import StatusRead
    from .schema_type import VehicleTypeRead

class VehicleBase(SQLModel):
    name_vehicle : str
    description_vehicle: str
    year_vehicle : int
    mileage_vehicle : int
    price_vehicle : float


class VehicleCreate(VehicleBase):
    trademark_id : int
    status_id : int
    type_id : int

class VehicleRead(VehicleBase):
    id_vehicle: int

class VehicleReadWithDetails(VehicleRead):
    trademark: Optional["TrademarkRead"] = None
    status: Optional["StatusRead"] = None
    vehicle_type: Optional["VehicleTypeRead"] = None

class VehicleUpdate(SQLModel):
    name_vehicle: Optional[str] = None
    description_vehicle: Optional[str] = None
    year_vehicle: Optional[int] = None
    mileage_vehicle: Optional[int] = None
    price_vehicle: Optional[float] = None

    trademark_id: Optional[int] = None
    status_id: Optional[int] = None
    type_id: Optional[int] = None

