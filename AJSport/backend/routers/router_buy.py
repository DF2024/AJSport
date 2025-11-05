from utils.roles import require_role
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from database.db import get_session
from auth.auth import get_current_user
from services import service_buy
from schema.schema_buy import BuyCreate, BuyRead, BuyUpdate, BuyReadWithDetails

router = APIRouter(
    prefix="/buys",
    tags=["Buys"],
    dependencies=[Depends(get_current_user)] 
)

@router.post("/", response_model=BuyReadWithDetails, status_code=status.HTTP_201_CREATED)
def create_buy_view(buy_data: BuyCreate, db: Session = Depends(get_session)):
    
    return service_buy.create_buy(db=db, buy_data=buy_data)

@router.get("/", response_model=list[BuyRead], dependencies=[Depends(require_role("admin"))])
def get_all_buys_view(db: Session = Depends(get_session)):
    return service_buy.get_all_buys(db=db)

@router.get("/{buy_id}", response_model=BuyReadWithDetails, dependencies=[Depends(require_role("admin"))])
def get_buy_by_id_view(buy_id: int, db: Session = Depends(get_session)):
    return service_buy.get_buy_by_id(db=db, buy_id=buy_id)

@router.put("/{buy_id}", response_model=BuyRead, dependencies=[Depends(require_role("admin"))])
def update_buy_view(buy_id: int, buy_data: BuyUpdate, db: Session = Depends(get_session)):
    return service_buy.update_buy(db=db, buy_id=buy_id, buy_data=buy_data)

@router.delete("/{buy_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_role("admin"))])
def delete_buy_view(buy_id: int, db: Session = Depends(get_session)):
    service_buy.delete_buy(db=db, buy_id=buy_id)
    return