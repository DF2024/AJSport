from backend.utils.roles import require_role
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from backend.database.db import get_session
from backend.auth.auth import get_current_user
from backend.services import service_type
from backend.schema.schema_type import VehicleTypeCreate, VehicleTypeRead
from backend.models.models_users import User

router = APIRouter(
    prefix="/vehicle-types", # Este es tu prefijo base
    tags=["Vehicle Types"]
)

# Define AdminAuth una sola vez en cada router
AdminAuth = [Depends(get_current_user), Depends(require_role("admin"))]

@router.post("/", response_model=VehicleTypeRead, status_code=status.HTTP_201_CREATED, dependencies=AdminAuth) # Usa AdminAuth
def create_vehicle_type_view(type_data: VehicleTypeCreate, db: Session = Depends(get_session)): # Elimina current_user explícito si AdminAuth ya lo provee
    """
    Crea un nuevo tipo de vehículo (protegido).
    """
    return service_type.create_vehicle_type(db=db, type_data=type_data)

@router.get("/", response_model=list[VehicleTypeRead], dependencies=AdminAuth) # Ya está bien
def get_all_vehicle_types_view(db: Session = Depends(get_session)):
    """
    Obtiene una lista de todos los tipos de vehículos (protegido para admin).
    """
    return service_type.get_all_vehicle_types(db=db)

# Decide si quieres que este sea público o admin. Para el dashboard, admin está bien.
@router.get("/{type_id}", response_model=VehicleTypeRead, dependencies=AdminAuth) 
def get_vehicle_type_by_id_view(type_id: int, db: Session = Depends(get_session)):
    """
    Obtiene un tipo de vehículo por su ID (protegido para admin).
    """
    return service_type.get_vehicle_type_by_id(db=db, type_id=type_id)

@router.delete("/{type_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=AdminAuth) # Usa AdminAuth
def delete_vehicle_type_view(type_id: int, db: Session = Depends(get_session)): # Elimina current_user explícito
    """
    Elimina un tipo de vehículo (protegido).
    """
    service_type.delete_vehicle_type(db=db, type_id=type_id)
    return