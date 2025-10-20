from sqlmodel import SQLModel, Field, Relationship
from pydantic import Optional, List
from typing import TYPE_CHECKING


if TYPE_CHECKING:
    from .models_vehicle import Vehicle

class Trademark(SQLModel, table = True):
    id_trademark : Optional[int] = Field(default = None, primary_key = True)
    name_trademark : str

    vehicles: list["Vehicle"] = Relationship(back_populates="trademark")