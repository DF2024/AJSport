from typing import Optional, TYPE_CHECKING

from pydantic import field_serializer
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
    image_path : Optional[str] = None
    image_url: Optional[str] = None

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

    @field_serializer("image_url")
    def compute_image_url(self, v, info):
        if self.image_path:
            return f"http://127.0.0.1:8000/{self.image_path}"
        return "https://via.placeholder.com/300x200?text=No+image"
    
    
class VehicleUpdate(SQLModel):
    name_vehicle: Optional[str] = None
    description_vehicle: Optional[str] = None
    year_vehicle: Optional[int] = None
    mileage_vehicle: Optional[int] = None
    price_vehicle: Optional[float] = None

    trademark_id: Optional[int] = None
    status_id: Optional[int] = None
    type_id: Optional[int] = None

