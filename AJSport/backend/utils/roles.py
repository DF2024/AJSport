from models.models_role import Role
from fastapi import Depends, HTTPException, status
from auth.auth import get_current_user
from models.models_users import User
from database.db import get_session
from sqlmodel import Session, select


def require_role(*roles: str):
    """Dependencia para verificar acceso basado en roles"""
    def role_checker(
            current_user: User = Depends(get_current_user),
            session: Session = Depends(get_session)
    ):
    
        if not current_user.role:

            current_user.role = session.get(Role, current_user.role_id)
            if not current_user.role:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Usuarios no tiene un rol asignado o no se pudo cargar el rol"
                )

        if current_user.role.name_role in roles:
            return current_user
        

        raise HTTPException(
            status_code = status.HTTP_403_FORBIDDEN,
            detail = f"No tiene los permisos necesarios. Roles requeridos: {', '.join(roles)}. Su rol: {current_user.role.name_role}"
        )
    return role_checker