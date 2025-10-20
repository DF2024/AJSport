from sqlmodel import SQLModel, Field
from pydantic import Optional

class Trademark(SQLModel, table = True):
    id_trademark : Optional[int] = Field(default = None, primary_key = True)
    name_trademark : str