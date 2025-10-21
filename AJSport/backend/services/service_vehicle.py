from fastapi import HTTPException
from sqlmodel import Session, select
from backend.models.models_vehicle import Vehicle
from backend.models.models_trademark import Trademark
from backend.models.models_status import Status
from backend.models.models_type import VehicleType
from backend.schema.schema_vehicle import VehicleCreate, VehicleUpdate # Ajusta la ruta

def _validate_foreign_keys(db: Session, vehicle_data: VehicleCreate | VehicleUpdate):
    """Función auxiliar para validar las FKs en la creación y actualización."""
    data_dict = vehicle_data.model_dump(exclude_unset=True)
    
    if "trademark_id" in data_dict and not db.get(Trademark, data_dict["trademark_id"]):
        raise HTTPException(status_code=404, detail=f"Trademark with id {data_dict['trademark_id']} not found")
    
    if "status_id" in data_dict and not db.get(Status, data_dict["status_id"]):
        raise HTTPException(status_code=404, detail=f"Status with id {data_dict['status_id']} not found")
    
    if "type_id" in data_dict and not db.get(VehicleType, data_dict["type_id"]):
        raise HTTPException(status_code=404, detail=f"VehicleType with id {data_dict['type_id']} not found")

def get_all_vehicles(db: Session) -> list[Vehicle]:
    """Obtiene todos los vehículos."""
    return db.exec(select(Vehicle)).all()

def get_vehicle_by_id(db: Session, vehicle_id: int) -> Vehicle:
    """Obtiene un vehículo por su ID."""
    vehicle = db.get(Vehicle, vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

def create_vehicle(db: Session, vehicle_data: VehicleCreate) -> Vehicle:
    """Crea un nuevo vehículo."""
    _validate_foreign_keys(db, vehicle_data) # Validamos que todos los IDs existan
    
    new_vehicle = Vehicle.model_validate(vehicle_data)
    
    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)
    return new_vehicle

def update_vehicle(db: Session, vehicle_id: int, vehicle_data: VehicleUpdate) -> Vehicle:
    
    vehicle = get_vehicle_by_id(db, vehicle_id)
    _validate_foreign_keys(db, vehicle_data) 

    update_data = vehicle_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(vehicle, key, value)
        
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle

def delete_vehicle(db: Session, vehicle_id: int) -> dict:
    """Elimina un vehículo."""
    vehicle = get_vehicle_by_id(db, vehicle_id)
    
    db.delete(vehicle)
    db.commit()
    return {"message": "Vehicle deleted successfully"}