from contextlib import asynccontextmanager
import os
from backend.models.models_role import Role
from sqlmodel import SQLModel, Session, create_engine, select
from fastapi import FastAPI, Depends
from typing import Annotated

sqlite_name = "db.sqlite3"
sqlite_url = f"sqlite:///{sqlite_name}"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "../db.sqlite3")
engine = create_engine(f"sqlite:///{os.path.abspath(DB_PATH)}")

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

@asynccontextmanager
async def lifespan(app : FastAPI):
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        for role_name in ["admin", "client"]:
            existing = session.exec(select(Role).where(Role.name_role == role_name)).first()
            if not existing:
                session.add(Role(name_role=role_name))
        session.commit()
    yield

print("Usando base de datos en:", os.path.abspath(DB_PATH))
