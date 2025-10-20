from sqlmodel import SQLModel

class StatusBase(SQLModel):
    status: str

class StatusCreate(StatusBase):
    pass

class StatusRead(StatusBase):
    id_status: int