import os
from uuid import uuid4
from fastapi import HTTPException, UploadFile
from sqlmodel import Session, select
from backend.models.models_vehicle import Vehicle
from backend.models.models_trademark import Trademark
from backend.models.models_status import Status
from backend.models.models_type import VehicleType

MEDIA_DIR = "backend/media/vehicles"
os.makedirs(MEDIA_DIR, exist_ok=True)

async def save_vehicle_image(image: UploadFile, vehicle_id: int) -> str:
    extension = os.path.splitext(image.filename)[1]
    filename = f"{vehicle_id}_{uuid4().hex}{extension}"
    file_path = os.path.join(MEDIA_DIR, filename)

    with open(file_path, "wb") as f:
        content = await image.read()
        f.write(content)

    return f"vehicles/{filename}"  # ruta relativa

def delete_vehicle_image(image_path: str):
    file_path = os.path.join("backend/media", image_path)
    if os.path.exists(file_path):
        os.remove(file_path)

# --- Helpers ---
def _validate_foreign_keys(db: Session, vehicle_data):
    data_dict = vehicle_data.model_dump(exclude_unset=True)
    if "trademark_id" in data_dict and not db.get(Trademark, data_dict["trademark_id"]):
        raise HTTPException(status_code=404, detail=f"Trademark with id {data_dict['trademark_id']} not found")
    if "status_id" in data_dict and not db.get(Status, data_dict["status_id"]):
        raise HTTPException(status_code=404, detail=f"Status with id {data_dict['status_id']} not found")
    if "type_id" in data_dict and not db.get(VehicleType, data_dict["type_id"]):
        raise HTTPException(status_code=404, detail=f"VehicleType with id {data_dict['type_id']} not found")

def _add_image_url(vehicle: Vehicle):

    image_url = (
        f"http://127.0.0.1:8000/{vehicle.image_path}"
        if vehicle.image_path else
        "https://via.placeholder.com/300x200?text=No+image"
    )

    # Retornamos un dict con todos los campos de Vehicle + image_url
    return {
        "id_vehicle": vehicle.id_vehicle,
        "name_vehicle": vehicle.name_vehicle,
        "description_vehicle": vehicle.description_vehicle,
        "year_vehicle": vehicle.year_vehicle,
        "mileage_vehicle": vehicle.mileage_vehicle,
        "price_vehicle": vehicle.price_vehicle,
        "image_path": vehicle.image_path,
        "image_url": image_url,
        "trademark_id": vehicle.trademark_id,
        "status_id": vehicle.status_id,
        "type_id": vehicle.type_id,
    }


# --- CRUD ---
def get_all_vehicles(db: Session) -> list[Vehicle]:
    vehicles = db.exec(select(Vehicle)).all()
    return [_add_image_url(v) for v in vehicles]

def get_vehicle_by_id(db: Session, vehicle_id: int) -> Vehicle:
    vehicle = db.get(Vehicle, vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return _add_image_url(vehicle)

async def create_vehicle(db: Session, vehicle_data, image: UploadFile | None = None) -> Vehicle:
    _validate_foreign_keys(db, vehicle_data)
    new_vehicle = Vehicle.model_validate(vehicle_data)
    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)

    if image:
        try:
            new_vehicle.image_path = await save_vehicle_image(image, new_vehicle.id_vehicle)
            db.add(new_vehicle)
            db.commit()
            db.refresh(new_vehicle)
        except Exception as e:
            db.delete(new_vehicle)
            db.commit()
            raise HTTPException(status_code=400, detail=f"Error al guardar imagen: {str(e)}")

    return _add_image_url(new_vehicle)

async def update_vehicle(db: Session, vehicle_id: int, vehicle_data, image: UploadFile | None = None) -> Vehicle:
    vehicle = get_vehicle_by_id(db, vehicle_id)
    _validate_foreign_keys(db, vehicle_data)

    if image:
        if vehicle.image_path:
            delete_vehicle_image(vehicle.image_path)
        vehicle.image_path = await save_vehicle_image(image, vehicle_id)

    update_data = vehicle_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(vehicle, key, value)

    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return _add_image_url(vehicle)

def delete_vehicle(db: Session, vehicle_id: int):
    vehicle = get_vehicle_by_id(db, vehicle_id)
    if vehicle.image_path:
        delete_vehicle_image(vehicle.image_path)
    db.delete(vehicle)
    db.commit()
    return {"message": "Vehicle deleted successfully"}

async def update_vehicle_image(db: Session, vehicle_id: int, image: UploadFile) -> Vehicle:
    vehicle = get_vehicle_by_id(db, vehicle_id)
    if vehicle.image_path:
        delete_vehicle_image(vehicle.image_path)
    vehicle.image_path = await save_vehicle_image(image, vehicle_id)
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return _add_image_url(vehicle)
