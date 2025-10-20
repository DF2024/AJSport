from sqlmodel import SQLModel, Field
from datetime import datetime, date
from pydantic import EmailStr, Optional

class User(SQLModel, table = True):
    id_user : Optional[int] = Field(default=None, primary_key=True)
    name_user : str
    lastname_user : str
    email_user : EmailStr
    hash_password : str
    ci_user : str
    number_user : str
    born_date : date
    create_at : datetime = Field(default_factory=datetime.utcnow)
