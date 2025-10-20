from sqlmodel import SQLModel, Field, Relationship
from pydantic import Optional
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .models_vehicle import Vehicle

class Status(SQLModel, table = True):
    id_status : Optional[int] = Field(default = None, primary_key = True)
    status : str

    vehicles: list["Vehicle"] = Relationship(back_populates="status")