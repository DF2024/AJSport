from datetime import datetime
from typing import Optional
from datetime import datetime, date
from pydantic import BaseModel, EmailStr
from sqlmodel import SQLModel

class UserBase(SQLModel):
    name_user : str
    lastname_user: str
    email_user : EmailStr
    ci_user : str
    number_user : str
    born_date : date

class UserCreate(UserBase):
    password : str

class UserRead(UserBase):
    id_user : int
    create_at : datetime

class UserUpdate(SQLModel):
    name_user : Optional[str] = None
    lastname_user : Optional[str] = None
    email_user : Optional[EmailStr] = None
    password : Optional[str] = None