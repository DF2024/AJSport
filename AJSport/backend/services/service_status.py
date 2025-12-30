from fastapi import HTTPException
from sqlmodel import Session, select
from models.models_status import Status 
from schema.schema_status import StatusCreate 

def get_all_statuses(db: Session) -> list[Status]:

    return db.exec(select(Status)).all()

def get_status_by_id(db: Session, status_id: int) -> Status:

    status = db.get(Status, status_id)
    if not status:
        raise HTTPException(status_code=404, detail="Status not found")
    return status

def create_status(db: Session, status_data: StatusCreate) -> Status:

    statement = select(Status).where(Status.status == status_data.status)
    if db.exec(statement).first():
        raise HTTPException(status_code=400, detail="Status with this name already exists")
    
    new_status = Status.model_validate(status_data)
    
    db.add(new_status)
    db.commit()
    db.refresh(new_status)
    return new_status

def delete_status(db: Session, status_id: int) -> dict:

    status = get_status_by_id(db, status_id)
    
    db.delete(status)
    db.commit()
    return {"message": "Status deleted successfully"}