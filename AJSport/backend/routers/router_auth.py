# En un archivo como: backend/routers/auth_router.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from backend.database.db import get_session
from backend.services import service_users
from backend.auth import auth

router = APIRouter(
    tags=["Authentication"]
)

@router.post("/token")
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(get_session)
):
 
    # 1. Buscar al usuario por su email (que viene en el campo 'username' del formulario)
    user = service_users.get_user_by_email(db, email=form_data.username)

    # 2. Verificar si el usuario existe y si la contraseña es correcta.
    #    Se usa la misma excepción genérica para no dar pistas a posibles atacantes.
    if not user or not auth.verify_password(form_data.password, user.hash_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 3. Si las credenciales son válidas, crear el token de acceso JWT.
    #    El 'subject' del token ('sub') será el ID del usuario.
    access_token_data = {"sub": str(user.id_user)}
    access_token = auth.create_access_token(data=access_token_data)

    # 4. Devolver el token según el estándar OAuth2.
    return {"access_token": access_token, "token_type": "bearer"}