from backend.models.models_role import Role
from fastapi import Depends, HTTPException, status
from backend.auth.auth import get_current_user
from backend.models.models_users import User
from backend.database.db import get_session
from sqlmodel import Session, select


def require_role(*roles: str):
    """Dependencia para verificar acceso basado en roles"""
    def role_checker(
            current_user: User = Depends(get_current_user),
            session: Session = Depends(get_session)
    ):
        if current_user.role and current_user.role.name_role == require_role:
            return current_user
        
        user_role = session.exec(select(Role).where(Role.id_role == current_user.role_id)).first()
        if user_role and user_role.name_role == require_role:
            return current_user

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"No tiene los permisos necesarios. Rol requerido: {require_role}"
        )


    return role_checker