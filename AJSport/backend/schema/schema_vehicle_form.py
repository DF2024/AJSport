from fastapi import Form
from typing import Optional
from schema.schema_vehicle import VehicleCreate, VehicleUpdate
from pydantic import BaseModel

class VehicleCreateForm(BaseModel):
    name_vehicle: str
    description_vehicle: Optional[str] = None
    year_vehicle: int
    mileage_vehicle: int
    price_vehicle: float
    trademark_id: int
    status_id: int
    type_id: int

    @classmethod
    def as_form(
        cls,
        name_vehicle: str = Form(...),
        description_vehicle: Optional[str] = Form(None),
        year_vehicle: int = Form(...),
        mileage_vehicle: int = Form(...),
        price_vehicle: float = Form(...),
        trademark_id: int = Form(...),
        status_id: int = Form(...),
        type_id: int = Form(...),
    ):
        return cls(
            name_vehicle=name_vehicle,
            description_vehicle=description_vehicle,
            year_vehicle=year_vehicle,
            mileage_vehicle=mileage_vehicle,
            price_vehicle=price_vehicle,
            trademark_id=trademark_id,
            status_id=status_id,
            type_id=type_id,
        )


class VehicleUpdateForm(VehicleUpdate):
    @classmethod
    def as_form(
        cls,
        trademark_id: Optional[int] = Form(None),
        status_id: Optional[int] = Form(None),
        type_id: Optional[int] = Form(None),
        name_vehicle: Optional[str] = Form(None),
        description_vehicle: Optional[str] = Form(None),
        year_vehicle: Optional[int] = Form(None),
        mileage_vehicle: Optional[int] = Form(None),
        price_vehicle: Optional[float] = Form(None),
    ):
        return cls(
            trademark_id=trademark_id,
            status_id=status_id,
            type_id=type_id,
            name_vehicle=name_vehicle,
            description_vehicle=description_vehicle,
            year_vehicle=year_vehicle,
            mileage_vehicle=mileage_vehicle,
            price_vehicle=price_vehicle,
        )
