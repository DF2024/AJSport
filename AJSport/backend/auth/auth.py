from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi.security import HTTPBearer
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status, Depends
from backend.models.models_users import User
from backend.database.db import get_session
from sqlmodel import Session, select
from backend.models.models_role import Role

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "secret_key_auth"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(
    schemes = ["argon2"],
    deprecated = "auto"
)

def hash_password(password : str) -> str: 
    return pwd_context.hash(password)

def verify_password(password : str, hashed_password : str) -> bool:
    return pwd_context.verify(password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp" : expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token inválido o expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        role_name: str = payload.get("role")
        if user_id is None or role_name is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = session.get(User, user_id)
    if user is None:
        raise credentials_exception

    user.role = user.role or type("Role", (), {"name_role": role_name})()

    return user

def get_current_admin(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No autorizado o no eres administrador",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        role_name: str = payload.get("role")
        if user_id is None or role_name != "admin":
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = session.get(User, user_id)
    if user is None:
        raise credentials_exception
    
    user_role = session.exec(select(Role).where(Role.id_role == user.role_id)).first

    if not user_role or user_role.name_role != "admin":
        raise credentials_exception
    
    return user

def get_current_client(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No autorizado o no eres cliente",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        role_name: str = payload.get("role")
        if user_id is None or role_name != "client": # AQUI ESTÁ LA VALIDACIÓN DEL ROL
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = session.get(User, user_id)
    if user is None:
        raise credentials_exception
    
    user_role = session.exec(select(Role).where(Role.id_role == user.role_id)).first()
    if not user_role or user_role.name_role != "client":
        raise credentials_exception

    return user