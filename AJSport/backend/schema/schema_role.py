# backend/schemas/schemas_role.py
from typing import Optional
from sqlmodel import SQLModel

class RoleBase(SQLModel):
    name_role: str

class RoleCreate(RoleBase):
    pass

class RoleRead(RoleBase):
    id_role: int

class RoleUpdate(SQLModel):
    name_role: Optional[str] = None
