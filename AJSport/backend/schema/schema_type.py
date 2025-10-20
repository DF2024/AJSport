from sqlmodel import SQLModel

class VehicleTypeBase(SQLModel):
    name_type : str

class VehicleTypeCreate(VehicleTypeBase):
    pass

class VehicleTypeRead(VehicleTypeBase):
    id_type: int

