from sqlmodel import SQLModel, Field
from pydantic import Optional
from datetime import date

class Buy(SQLModel, table = True):
    id_buy : Optional[int] = Field(default = None, primary_key = True)
    id_user : Optional[int] = Field(default = None,  foreign_key = "user.id_user")
    id_vehicle : Optional[int] = Field(default = None,  foreign_key = "vehicle.id_vehicle")
    date_buy : date
    price : Optional[float] = Field

