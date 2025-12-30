from utils.roles import require_role
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from database.db import get_session
from auth.auth import get_current_user
from services import service_type
from schema.schema_type import VehicleTypeCreate, VehicleTypeRead
from models.models_users import User

router = APIRouter(
    prefix="/vehicle-types", 
    tags=["Vehicle Types"]
)


AdminAuth = [Depends(get_current_user), Depends(require_role("admin"))]

@router.post("/", response_model=VehicleTypeRead, status_code=status.HTTP_201_CREATED, dependencies=AdminAuth) 
def create_vehicle_type_view(type_data: VehicleTypeCreate, db: Session = Depends(get_session)): 

    return service_type.create_vehicle_type(db=db, type_data=type_data)

@router.get("/", response_model=list[VehicleTypeRead], dependencies=AdminAuth) 
def get_all_vehicle_types_view(db: Session = Depends(get_session)):

    return service_type.get_all_vehicle_types(db=db)


@router.get("/{type_id}", response_model=VehicleTypeRead, dependencies=AdminAuth) 
def get_vehicle_type_by_id_view(type_id: int, db: Session = Depends(get_session)):

    return service_type.get_vehicle_type_by_id(db=db, type_id=type_id)

@router.delete("/{type_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=AdminAuth) 
def delete_vehicle_type_view(type_id: int, db: Session = Depends(get_session)): 

    service_type.delete_vehicle_type(db=db, type_id=type_id)
    return