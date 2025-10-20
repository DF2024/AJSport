from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from backend.database.db import get_session
from backend.auth.auth import get_current_user
from backend.services import service_vehicle
from backend.schema.schema_vehicle import VehicleCreate, VehicleRead, VehicleUpdate, VehicleReadWithDetails
from backend.models.models_users import User

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"]
)

@router.post("/", response_model=VehicleReadWithDetails, status_code=status.HTTP_201_CREATED)
def create_vehicle_view(vehicle_data: VehicleCreate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return service_vehicle.create_vehicle(db=db, vehicle_data=vehicle_data)

@router.get("/", response_model=list[VehicleRead])
def get_all_vehicles_view(db: Session = Depends(get_session)): # Endpoint público para ver el catálogo
    return service_vehicle.get_all_vehicles(db=db)

@router.get("/{vehicle_id}", response_model=VehicleReadWithDetails)
def get_vehicle_by_id_view(vehicle_id: int, db: Session = Depends(get_session)): # Endpoint público
    return service_vehicle.get_vehicle_by_id(db=db, vehicle_id=vehicle_id)

@router.put("/{vehicle_id}", response_model=VehicleReadWithDetails)
def update_vehicle_view(vehicle_id: int, vehicle_data: VehicleUpdate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return service_vehicle.update_vehicle(db=db, vehicle_id=vehicle_id, vehicle_data=vehicle_data)

@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehicle_view(vehicle_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    service_vehicle.delete_vehicle(db=db, vehicle_id=vehicle_id)
    return