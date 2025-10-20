from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from backend.database.db import get_session
from backend.auth.auth import get_current_user
from backend.services import service_trademark
from backend.schema.schema_trademark import TrademarkCreate, TrademarkRead, TrademarkReadWithVehicles
from backend.models.models_users import User

router = APIRouter(
    prefix="/trademarks",
    tags=["Trademarks"]
)

@router.post("/", response_model=TrademarkRead, status_code=status.HTTP_201_CREATED)
def create_trademark_view(trademark_data: TrademarkCreate, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return service_trademark.create_trademark(db=db, trademark_data=trademark_data)

@router.get("/", response_model=list[TrademarkRead])
def get_all_trademarks_view(db: Session = Depends(get_session)): # Endpoint público
    return service_trademark.get_all_trademarks(db=db)

@router.get("/{trademark_id}", response_model=TrademarkReadWithVehicles)
def get_trademark_by_id_view(trademark_id: int, db: Session = Depends(get_session)): # Endpoint público
    return service_trademark.get_trademark_by_id(db=db, trademark_id=trademark_id)


@router.delete("/{trademark_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trademark_view(trademark_id: int, db: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    service_trademark.delete_trademark(db=db, trademark_id=trademark_id)
    return