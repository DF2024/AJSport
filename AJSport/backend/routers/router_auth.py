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
 
   
    user = service_users.get_user_by_email(db, email=form_data.username)

    
    if not user or not auth.verify_password(form_data.password, user.hash_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )


    access_token_data = {
        "sub": str(user.id_user),
        "role" : user.role.name_role
        }
    access_token = auth.create_access_token(data=access_token_data)

    return {"access_token": access_token, "token_type": "bearer"}