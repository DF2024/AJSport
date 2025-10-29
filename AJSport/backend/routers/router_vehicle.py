from fastapi import APIRouter, Depends, status, UploadFile, File, HTTPException
from sqlmodel import Session
from typing import Optional, Annotated
from backend.database.db import get_session
from backend.utils.roles import require_role
from backend.auth.auth import get_current_user
from backend.services import service_vehicle
from backend.schema.schema_vehicle import VehicleRead, VehicleReadWithDetails
from backend.schema.schema_vehicle_form import VehicleCreateForm, VehicleUpdateForm

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])

DBSession = Annotated[Session, Depends(get_session)]
AdminAuth = [Depends(get_current_user), Depends(require_role("admin"))]

@router.post("/", response_model=VehicleReadWithDetails, status_code=status.HTTP_201_CREATED, dependencies=AdminAuth)
async def create_vehicle_view(
    db: DBSession,
    vehicle_data: Annotated[VehicleCreateForm, Depends(VehicleCreateForm.as_form)],
    image: Optional[UploadFile] = File(None),
):
    return await service_vehicle.create_vehicle(db=db, vehicle_data=vehicle_data, image=image)

@router.get("/", response_model=list[VehicleRead])
def get_all_vehicles_view(db: DBSession):
    vehicle = service_vehicle.get_all_vehicles(db=db)
    return [service_vehicle._add_image_url(v) for v in vehicle]

@router.get("/{vehicle_id}", response_model=VehicleReadWithDetails)
def get_vehicle_by_id_view(vehicle_id: int, db: DBSession):
    vehicle = service_vehicle.get_vehicle_by_id(db=db, vehicle_id=vehicle_id)
    return service_vehicle._add_image_url(vehicle)

@router.put("/{vehicle_id}", response_model=VehicleReadWithDetails, dependencies=AdminAuth)
async def update_vehicle_view(
    db: DBSession,
    vehicle_id: int,
    vehicle_data: Annotated[VehicleUpdateForm, Depends(VehicleUpdateForm.as_form)],
    image: Optional[UploadFile] = File(None),
):
    return await service_vehicle.update_vehicle(db=db, vehicle_id=vehicle_id, vehicle_data=vehicle_data, image=image)

@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=AdminAuth)
def delete_vehicle_view(vehicle_id: int, db: DBSession):
    service_vehicle.delete_vehicle(db=db, vehicle_id=vehicle_id)
    return

@router.put("/{vehicle_id}/image", response_model=VehicleReadWithDetails, dependencies=AdminAuth)
async def update_vehicle_image_view(db: DBSession, vehicle_id: int, image: UploadFile = File(...)):
    if not image:
        raise HTTPException(status_code=400, detail="Debe subir una imagen.")
    return await service_vehicle.update_vehicle_image(db=db, vehicle_id=vehicle_id, image=image)
