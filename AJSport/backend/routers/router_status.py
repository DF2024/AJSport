# En un archivo como: backend/routers/status_router.py

from utils.roles import require_role
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from database.db import get_session
from auth.auth import get_current_user
from services import service_status
from schema.schema_status import StatusCreate, StatusRead
from models.models_users import User

router = APIRouter(
    prefix="/statuses",
    tags=["Statuses"]
)

AdminAuth = [Depends(get_current_user), Depends(require_role("admin"))]


@router.post("/", response_model=StatusRead, status_code=status.HTTP_201_CREATED, dependencies=AdminAuth)
def create_status_view(status_data: StatusCreate, db: Session = Depends(get_session)):
    """
    Crea un nuevo estado de vehículo (protegido).
    """
    return service_status.create_status(db=db, status_data=status_data)

@router.get("/", response_model=list[StatusRead],  dependencies=AdminAuth)
def get_all_statuses_view(db: Session = Depends(get_session)):
    """
    Obtiene una lista de todos los estados de vehículos (público).
    """
    return service_status.get_all_statuses(db=db)

@router.get("/{status_id}", response_model=StatusRead,  dependencies=AdminAuth)
def get_status_by_id_view(status_id: int, db: Session = Depends(get_session)):
    """
    Obtiene un estado de vehículo por su ID (público).
    """
    return service_status.get_status_by_id(db=db, status_id=status_id)

@router.delete("/{status_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=AdminAuth)
def delete_status_view(status_id: int, db: Session = Depends(get_session)):
    """
    Elimina un estado de vehículo (protegido).
    """
    service_status.delete_status(db=db, status_id=status_id)
    return