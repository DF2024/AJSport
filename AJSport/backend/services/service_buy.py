from fastapi import HTTPException
from sqlmodel import Session, select
from models.models_buy import Buy
from models.models_users import User
from models.models_vehicle import Vehicle
from schema.schema_buy import BuyCreate, BuyUpdate # Ajusta la ruta

def get_all_buys(db: Session) -> list[Buy]:
    """Obtiene todas las compras."""
    return db.exec(select(Buy)).all()

def get_buy_by_id(db: Session, buy_id: int) -> Buy:
    """Obtiene una compra por su ID."""
    buy = db.get(Buy, buy_id)
    if not buy:
        raise HTTPException(status_code=404, detail="Buy not found")
    return buy

def create_buy(db: Session, buy_data: BuyCreate) -> Buy:
    """Crea un nuevo registro de compra."""
    # 1. Validar que las claves foráneas existan
    user = db.get(User, buy_data.id_user)
    if not user:
        raise HTTPException(status_code=404, detail=f"User with id {buy_data.id_user} not found")
        
    vehicle = db.get(Vehicle, buy_data.id_vehicle)
    if not vehicle:
        raise HTTPException(status_code=404, detail=f"Vehicle with id {buy_data.id_vehicle} not found")

    # 2. Crear la compra (la fecha se añade automáticamente por el 'default_factory' del modelo)
    new_buy = Buy.model_validate(buy_data)
    
    db.add(new_buy)
    db.commit()
    db.refresh(new_buy)
    return new_buy

def update_buy(db: Session, buy_id: int, buy_data: BuyUpdate) -> Buy:
    """Actualiza una compra."""
    buy = get_buy_by_id(db, buy_id)
    
    update_data = buy_data.model_dump(exclude_unset=True)
    
    # Opcional: Validar nuevos IDs si se están cambiando
    if "id_user" in update_data and not db.get(User, update_data["id_user"]):
        raise HTTPException(status_code=404, detail=f"User with id {update_data['id_user']} not found")
    if "id_vehicle" in update_data and not db.get(Vehicle, update_data["id_vehicle"]):
        raise HTTPException(status_code=404, detail=f"Vehicle with id {update_data['id_vehicle']} not found")

    for key, value in update_data.items():
        setattr(buy, key, value)
        
    db.add(buy)
    db.commit()
    db.refresh(buy)
    return buy

def delete_buy(db: Session, buy_id: int) -> dict:
    """Elimina un registro de compra."""
    buy = get_buy_by_id(db, buy_id)
    
    db.delete(buy)
    db.commit()
    return {"message": "Buy record deleted successfully"}