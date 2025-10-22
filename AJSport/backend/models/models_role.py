from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, List, Optional

if TYPE_CHECKING:
    from .models_users import User 


class Role(SQLModel, table = True):
    id_role : Optional[int] = Field(default = None, primary_key = True)
    name_role : str

    user : List["User"] = Relationship(back_populates = "role")