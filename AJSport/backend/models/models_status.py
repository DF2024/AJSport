from sqlmodel import SQLModel, Field, Relationship
from pydantic import Optional
from typing import List


class Status(SQLModel, table = True):
    id_status : Optional[int] = Field(default = None, primary_key = True)
    status : str

    vehicles: List["Vehicle"] = Relationship(back_populates = "status")