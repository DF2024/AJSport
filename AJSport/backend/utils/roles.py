from fastapi import Depends, HTTPException, status
from backend.auth.auth import get_current_user
from backend.models.models_users import User

def require_role(*roles: str):
    """Dependencia para verificar acceso basado en roles"""
    def role_checker(current_user: User = Depends(get_current_user)):
        user_role = current_user.role.name_role if current_user.role else None
        if user_role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Acceso denegado. Se requiere uno de los roles: {roles}",
            )
        return current_user
    return role_checker