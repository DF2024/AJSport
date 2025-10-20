from fastapi import HTTPException
from sqlmodel import Session, select
from backend.models.models_users import User
from backend.auth import auth
from backend.schema.schema_user import UserCreate, UserRead, UserUpdate

def get_all_users(db : Session) -> list[UserRead]:
    users = db.exec(select(User)).all()
    return [UserRead.model_validate(user) for user in users]

def get_user_by_id(db: Session, user_id: int):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserRead.model_validate(user)

def get_user_by_email(db: Session, email: str) -> User | None:
    """Obtiene un usuario por su dirección de email."""
    statement = select(User).where(User.email_user == email)
    return db.exec(statement).first()

def create_users(db: Session, user_data: UserCreate):
    statement = select(User).where(User.email_user == user_data.email_user)
    existing_user = db.exec(statement).first()

    if existing_user:
        raise HTTPException(status_code = 400, detail = "user alrealy registered")
    
    user_dict = user_data.model_dump()
    password = user_dict.pop("password")
    user_dict["hash_password"] = auth.hash_password(password)
    
    new_user = User(**user_dict) 

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def update_user(db: Session, user_id: int, user_data: UserUpdate):
    """Actualiza un usuario existente."""
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        if key == "password":
            setattr(user, "hash_password", auth.hash_password(value))
        else:
            setattr(user, key, value)

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user_id: int):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    
    return {"message": "User deleted successfully"}