from fastapi import APIRouter, Depends, status, UploadFile, File, HTTPException, Body
from sqlmodel import Session, select
from typing import Optional, Annotated, List
import csv
import io
import os 

from database.db import get_session
from utils.roles import require_role
from auth.auth import get_current_user 
from services import service_vehicle 
from schema.schema_vehicle import VehicleRead, VehicleReadWithDetails, VehicleCreate 
from schema.schema_vehicle_form import VehicleCreateForm, VehicleUpdateForm
from models.models_trademark import Trademark 
from models.models_status import Status
from models.models_type import VehicleType
from schema.schema_trademark import TrademarkRead 
from schema.schema_status import StatusRead
from schema.schema_type import VehicleTypeRead
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

@router.get("/", response_model=list[VehicleReadWithDetails])
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

## SUBIDA MASIVA POR CSV

@router.post("/upload-csv/", status_code=status.HTTP_201_CREATED, dependencies=AdminAuth)
async def upload_vehicles_csv(
        db: DBSession,
        file: UploadFile = File(...),
):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code = 400, detail = "Invalid file type. Only CSV files are allowed.")

    content = await file.read()
    csv_file = io.StringIO(content.decode('utf-8'))
    reader = csv.DictReader(csv_file)
    
    vehicles_to_add = []
    errors = []    
    
    for i, row in enumerate(reader):
        try:
            # Validar y convertir tipos de datos, similar a tu esquema VehicleCreate
            vehicle_data = {
                "name_vehicle": row["name_vehicle"],
                "description_vehicle": row["description_vehicle"],
                "year_vehicle": int(row["year_vehicle"]),
                "mileage_vehicle": int(row["mileage_vehicle"]),
                "price_vehicle": float(row["price_vehicle"]),
                "image_path": row.get("image_path"), # Puede ser opcional en el CSV
                "trademark_id": int(row["trademark_id"]),
                "status_id": int(row["status_id"]),
                "type_id": int(row["type_id"]),
            }
            
            # Validación de existencia de IDs (Trademark, Status, Type)
            trademark = db.get(Trademark, vehicle_data["trademark_id"])
            if not trademark:
                raise ValueError(f"Trademark ID {vehicle_data['trademark_id']} not found.")
            status_obj = db.get(Status, vehicle_data["status_id"])
            if not status_obj:
                raise ValueError(f"Status ID {vehicle_data['status_id']} not found.")
            vehicle_type_obj = db.get(VehicleType, vehicle_data["type_id"])
            if not vehicle_type_obj:
                raise ValueError(f"VehicleType ID {vehicle_data['type_id']} not found.")

            if not trademark or not status_obj or not vehicle_type_obj:
                print(f"Fila {i+1}: ID inexistente")


            # Crear instancia de Vehicle y añadir
            vehicles_to_add.append(service_vehicle._create_vehicle_object_from_data(vehicle_data)) # Puedes mover esta lógica a service_vehicle
        
        except (ValueError, KeyError) as e:
            print(f"Fila {i+1} error: {e} - Datos: {row}")
            errors.append(f"Row {i+1} parsing error: {e} - Data: {row}")
            continue
        
    if errors:
        raise HTTPException(status_code=400, detail={"message": "Some rows had errors", "errors": errors})

    db.add_all(vehicles_to_add)
    db.commit()

    return {"message": f"Successfully added {len(vehicles_to_add)} vehicles from CSV."}


@router.delete("/bulk-delete/", status_code=status.HTTP_200_OK, dependencies=AdminAuth)
def bulk_delete_vehicles(
    db: DBSession,
    ids: list[int] = Body(..., embed=True)
):
    if not ids:
        raise HTTPException(status_code=400, detail="No vehicle IDs provided.")

    from models.models_vehicle import Vehicle  # asegúrate de importar tu modelo Vehicle

    vehicles = db.exec(select(Vehicle).where(Vehicle.id_vehicle.in_(ids))).all()
    
    if not vehicles:
        raise HTTPException(status_code=404, detail="No matching vehicles found.")

    for vehicle in vehicles:
        db.delete(vehicle)

    db.commit()
    return {"message": f"Successfully deleted {len(vehicles)} vehicles."}