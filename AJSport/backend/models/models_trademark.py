from sqlmodel import SQLModel, Field, Relationship
from pydantic import Optional, List

class Trademark(SQLModel, table = True):
    id_trademark : Optional[int] = Field(default = None, primary_key = True)
    name_trademark : str

    vehicles : List["Vehicle"] = Relationship(back_populates="trademark")