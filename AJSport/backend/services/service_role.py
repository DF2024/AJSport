from sqlmodel import Session, select
from fastapi import HTTPException, status
from backend.models.models_role import Role
from backend.schema.schema_role import RoleCreate, RoleUpdate

def get_roles(session: Session):
    return session.exec(select(Role)).all()

def get_role_by_id(session: Session, role_id: int):
    role = session.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Rol no encontrado.")
    return role

def create_role(session: Session, role_data: RoleCreate):
    existing = session.exec(select(Role).where(Role.name_role == role_data.name_role)).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El rol ya existe.")
    role = Role(name_role=role_data.name_role)
    session.add(role)
    session.commit()
    session.refresh(role)
    return role

def update_role(session: Session, role_id: int, role_data: RoleUpdate):
    role = get_role_by_id(session, role_id)
    if role_data.name_role:
        role.name_role = role_data.name_role
    session.add(role)
    session.commit()
    session.refresh(role)
    return role

def delete_role(session: Session, role_id: int):
    role = get_role_by_id(session, role_id)
    session.delete(role)
    session.commit()
    return {"message": "Rol eliminado exitosamente"}