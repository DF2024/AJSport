from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from backend.database.db import get_session
from backend.auth.auth import get_current_user
from backend.services import service_buy
from backend.schema.schema_buy import BuyCreate, BuyRead, BuyUpdate, BuyReadWithDetails

router = APIRouter(
    prefix="/buys",
    tags=["Buys"],
    dependencies=[Depends(get_current_user)] # Proteger todos los endpoints de este router
)

@router.post("/", response_model=BuyReadWithDetails, status_code=status.HTTP_201_CREATED)
def create_buy_view(buy_data: BuyCreate, db: Session = Depends(get_session)):
    # Podrías añadir lógica para que un usuario solo pueda comprar para sí mismo
    return service_buy.create_buy(db=db, buy_data=buy_data)

@router.get("/", response_model=list[BuyRead])
def get_all_buys_view(db: Session = Depends(get_session)):
    # Probablemente solo un admin debería ver todas las compras
    return service_buy.get_all_buys(db=db)

@router.get("/{buy_id}", response_model=BuyReadWithDetails)
def get_buy_by_id_view(buy_id: int, db: Session = Depends(get_session)):
    # Aquí podrías verificar si la compra pertenece al 'current_user'
    return service_buy.get_buy_by_id(db=db, buy_id=buy_id)

@router.put("/{buy_id}", response_model=BuyRead)
def update_buy_view(buy_id: int, buy_data: BuyUpdate, db: Session = Depends(get_session)):
    return service_buy.update_buy(db=db, buy_id=buy_id, buy_data=buy_data)

@router.delete("/{buy_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_buy_view(buy_id: int, db: Session = Depends(get_session)):
    service_buy.delete_buy(db=db, buy_id=buy_id)
    return