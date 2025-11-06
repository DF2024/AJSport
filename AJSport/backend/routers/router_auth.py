# En un archivo como: backend/routers/auth_router.py

from sqlalchemy import select
from models.models_users import User
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import selectinload
from sqlmodel import Session
from database.db import get_session
from services import service_users
from auth.auth import create_access_token, verify_password


router = APIRouter(
    tags=["Authentication"]
)

@router.post("/login")
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(get_session)
):
 
   
    user = db.exec(
        select(User).options(selectinload(User.role))
        .where(User.email_user == form_data.username)
    ).scalars().first()


    
    if not user or not verify_password(form_data.password, user.hash_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )


    access_token_data = {
        "sub": str(user.id_user),
        "role" : user.role.name_role
        }
    access_token = create_access_token(data=access_token_data)

    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "role": user.role.name_role
            }