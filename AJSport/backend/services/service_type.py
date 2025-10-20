# En un archivo como: backend/services/vehicle_type_service.py

from fastapi import HTTPException
from sqlmodel import Session, select
from backend.models.models_type import VehicleType # Ajusta la ruta
from backend.schema.schema_type import VehicleTypeCreate # Ajusta la ruta

def get_all_vehicle_types(db: Session) -> list[VehicleType]:
    """Obtiene todos los tipos de vehículos."""
    return db.exec(select(VehicleType)).all()

def get_vehicle_type_by_id(db: Session, type_id: int) -> VehicleType:
    """Obtiene un tipo de vehículo por su ID."""
    vehicle_type = db.get(VehicleType, type_id)
    if not vehicle_type:
        raise HTTPException(status_code=404, detail="Vehicle type not found")
    return vehicle_type

def create_vehicle_type(db: Session, type_data: VehicleTypeCreate) -> VehicleType:
    """Crea un nuevo tipo de vehículo."""
    statement = select(VehicleType).where(VehicleType.name_type == type_data.name_type)
    if db.exec(statement).first():
        raise HTTPException(status_code=400, detail="Vehicle type with this name already exists")
    
    new_type = VehicleType.model_validate(type_data)
    
    db.add(new_type)
    db.commit()
    db.refresh(new_type)
    return new_type

def delete_vehicle_type(db: Session, type_id: int) -> dict:
    """Elimina un tipo de vehículo."""
    vehicle_type = get_vehicle_type_by_id(db, type_id)
    
    db.delete(vehicle_type)
    db.commit()
    return {"message": "Vehicle type deleted successfully"}