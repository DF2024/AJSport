from sqlmodel import SQLModel, Field
from pydantic import Optional

class Status(SQLModel, table = True):
    id_status : Optional[int] = Field(default = None, primary_key = True)
    status : str
