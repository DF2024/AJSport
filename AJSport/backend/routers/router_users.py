from utils.roles import require_role
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from database.db import get_session
from auth.auth import get_current_user
from services import service_users
from schema.schema_user import UserCreate, UserRead, UserUpdate
from models.models_users import User

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_new_user(user_data: UserCreate, db: Session = Depends(get_session)):

    return service_users.create_users(db=db, user_data=user_data)

@router.get("/", response_model=list[UserRead], dependencies=[Depends(require_role("admin"))])
def get_all_users_view(db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):

    return service_users.get_all_users(db=db)

@router.get("/{user_id}", response_model=UserRead, dependencies=[Depends(require_role("admin"))])
def get_user_by_id_view(user_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):

    return service_users.get_user_by_id(db=db, user_id=user_id)

@router.put("/{user_id}", response_model=UserRead, dependencies=[Depends(require_role("admin"))])
def update_user_view(user_id: int, user_data: UserUpdate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):

    return service_users.update_user(db=db, user_id=user_id, user_data=user_data)

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_role("admin"))])
def delete_user_view(user_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):

    service_users.delete_user(db=db, user_id=user_id)

    return