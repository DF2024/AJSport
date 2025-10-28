from fastapi import HTTPException, UploadFile
from sqlmodel import Session, select
from typing import Optional
from backend.models.models_vehicle import Vehicle
from backend.models.models_trademark import Trademark
from backend.models.models_status import Status
from backend.models.models_type import VehicleType
from backend.schema.schema_vehicle_form import VehicleCreateForm, VehicleUpdateForm
from backend.services.service_image import save_vehicle_image, delete_vehicle_image


def _validate_foreign_keys(db: Session, vehicle_data: VehicleCreateForm | VehicleUpdateForm):
    """Valida que las claves foráneas existan en la base de datos"""
    data_dict = vehicle_data.model_dump(exclude_unset=True)
    
    if "trademark_id" in data_dict and not db.get(Trademark, data_dict["trademark_id"]):
        raise HTTPException(status_code=404, detail=f"Trademark with id {data_dict['trademark_id']} not found")
    
    if "status_id" in data_dict and not db.get(Status, data_dict["status_id"]):
        raise HTTPException(status_code=404, detail=f"Status with id {data_dict['status_id']} not found")
    
    if "type_id" in data_dict and not db.get(VehicleType, data_dict["type_id"]):
        raise HTTPException(status_code=404, detail=f"VehicleType with id {data_dict['type_id']} not found")


def get_all_vehicles(db: Session) -> list[Vehicle]:
    return db.exec(select(Vehicle)).all()


def get_vehicle_by_id(db: Session, vehicle_id: int) -> Vehicle:
    vehicle = db.get(Vehicle, vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle


async def create_vehicle(
    db: Session,
    vehicle_data: VehicleCreateForm,
    image: Optional[UploadFile] = None
) -> Vehicle:
    _validate_foreign_keys(db, vehicle_data)
    
    new_vehicle = Vehicle.model_validate(vehicle_data)
    db.add(new_vehicle)
    db.commit()           # ✅ Commit para generar id_vehicle
    db.refresh(new_vehicle)  # ✅ Refresh para actualizar el objeto con id_vehicle

    if image:
        try:
            image_path = await save_vehicle_image(image, new_vehicle.id_vehicle)
            new_vehicle.image_path = image_path
            db.add(new_vehicle)
            db.commit()
            db.refresh(new_vehicle)
        except Exception as e:
            db.delete(new_vehicle)
            db.commit()
            raise HTTPException(status_code=400, detail=f"Error al guardar imagen: {str(e)}")

    return new_vehicle


async def update_vehicle(
    db: Session,
    vehicle_id: int,
    vehicle_data: VehicleUpdateForm,
    image: Optional[UploadFile] = None
) -> Vehicle:
    vehicle = get_vehicle_by_id(db, vehicle_id)
    _validate_foreign_keys(db, vehicle_data)

    # Actualizar imagen si se proporciona
    if image:
        if vehicle.image_path:
            delete_vehicle_image(vehicle.image_path)
        image_path = await save_vehicle_image(image, vehicle.id_vehicle)
        vehicle.image_path = image_path

    # Actualizar campos
    update_data = vehicle_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(vehicle, key, value)

    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle


async def delete_vehicle(db: Session, vehicle_id: int) -> dict:
    vehicle = get_vehicle_by_id(db, vehicle_id)

    if vehicle.image_path:
        delete_vehicle_image(vehicle.image_path)
    
    db.delete(vehicle)
    db.commit()
    return {"message": "Vehicle deleted successfully"}


async def update_vehicle_image(
    db: Session,
    vehicle_id: int,
    image: UploadFile
) -> Vehicle:
    vehicle = get_vehicle_by_id(db, vehicle_id)

    if vehicle.image_path:
        delete_vehicle_image(vehicle.image_path)
    
    image_path = await save_vehicle_image(image, vehicle.id_vehicle)
    vehicle.image_path = image_path

    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle


async def delete_vehicle_image(db: Session, vehicle_id: int) -> Vehicle:
    vehicle = get_vehicle_by_id(db, vehicle_id)

    if vehicle.image_path:
        delete_vehicle_image(vehicle.image_path)
        vehicle.image_path = None
        db.add(vehicle)
        db.commit()
        db.refresh(vehicle)

    return vehicle
