# En un archivo como: backend/routers/status_router.py

from backend.utils.roles import require_role
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from backend.database.db import get_session
from backend.auth.auth import get_current_user
from backend.services import service_status
from backend.schema.schema_status import StatusCreate, StatusRead
from backend.models.models_users import User

router = APIRouter(
    prefix="/statuses",
    tags=["Statuses"]
)

AdminAuth = [Depends(get_current_user), Depends(require_role("admin"))]


@router.post("/", response_model=StatusRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_role("admin"))])
def create_status_view(status_data: StatusCreate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
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

@router.get("/{status_id}", response_model=StatusRead, dependencies=[Depends(require_role("admin"))])
def get_status_by_id_view(status_id: int, db: Session = Depends(get_session)):
    """
    Obtiene un estado de vehículo por su ID (público).
    """
    return service_status.get_status_by_id(db=db, status_id=status_id)

@router.delete("/{status_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_role("admin"))])
def delete_status_view(status_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    """
    Elimina un estado de vehículo (protegido).
    """
    service_status.delete_status(db=db, status_id=status_id)
    return