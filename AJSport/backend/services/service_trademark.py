from fastapi import HTTPException
from sqlmodel import Session, select
from backend.models.models_trademark import Trademark  # Ajusta la ruta a tus modelos
from backend.schema.schema_trademark import TrademarkCreate

def get_all_trademarks(db: Session) -> list[Trademark]:
    """Obtiene todas las marcas."""
    return db.exec(select(Trademark)).all()

def get_trademark_by_id(db: Session, trademark_id: int) -> Trademark:
    """Obtiene una marca por su ID."""
    trademark = db.get(Trademark, trademark_id)
    if not trademark:
        raise HTTPException(status_code=404, detail="Trademark not found")
    return trademark

def create_trademark(db: Session, trademark_data: TrademarkCreate) -> Trademark:
    """Crea una nueva marca."""
    # Evitar duplicados por nombre
    statement = select(Trademark).where(Trademark.name_trademark == trademark_data.name_trademark)
    if db.exec(statement).first():
        raise HTTPException(status_code=400, detail="Trademark with this name already exists")
    
    new_trademark = Trademark.model_validate(trademark_data)
    
    db.add(new_trademark)
    db.commit()
    db.refresh(new_trademark)
    return new_trademark


def delete_trademark(db: Session, trademark_id: int) -> dict:

    trademark = get_trademark_by_id(db, trademark_id)
    
    db.delete(trademark)
    db.commit()
    return {"message": "Trademark deleted successfully"}