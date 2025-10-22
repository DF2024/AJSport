# backend/routers/router_role.py
from fastapi import APIRouter, Depends
from sqlmodel import Session
from backend.database.db import get_session
from backend.schema.schema_role import RoleRead, RoleCreate, RoleUpdate
from backend.services.service_role import (
    get_roles, get_role_by_id, create_role, update_role, delete_role
)
from backend.utils.roles import require_role

router = APIRouter(prefix="/roles", tags=["Roles"])

@router.get("/", response_model=list[RoleRead], dependencies=[Depends(require_role("admin"))])
def list_roles(session: Session = Depends(get_session)):
    return get_roles(session)

@router.get("/{role_id}", response_model=RoleRead, dependencies=[Depends(require_role("admin"))])
def read_role(role_id: int, session: Session = Depends(get_session)):
    return get_role_by_id(session, role_id)

@router.post("/", response_model=RoleRead, dependencies=[Depends(require_role("admin"))])
def create_new_role(role_data: RoleCreate, session: Session = Depends(get_session)):
    return create_role(session, role_data)

@router.put("/{role_id}", response_model=RoleRead, dependencies=[Depends(require_role("admin"))])
def modify_role(role_id: int, role_data: RoleUpdate, session: Session = Depends(get_session)):
    return update_role(session, role_id, role_data)

@router.delete("/{role_id}", dependencies=[Depends(require_role("admin"))])
def remove_role(role_id: int, session: Session = Depends(get_session)):
    return delete_role(session, role_id)
