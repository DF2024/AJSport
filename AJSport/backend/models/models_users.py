from typing import TYPE_CHECKING
from typing import  Optional
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, date
from pydantic import EmailStr

if TYPE_CHECKING:
    from .models_buy import Buy
    from .models_role import Role

class User(SQLModel, table = True):
    id_user : Optional[int] = Field(default=None, primary_key=True)
    name_user : str
    lastname_user : str
    email_user : EmailStr = Field(unique=True, index=True)
    hash_password : str
    ci_user : str
    number_user : str
    born_date : date
    create_at : datetime = Field(default_factory=datetime.utcnow)

    role_id: Optional[int] = Field(default=None, foreign_key="role.id_role")

    buys: list["Buy"] = Relationship(back_populates="user")
    role: Optional["Role"] = Relationship(back_populates="user")