import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.routers import router_users,router_auth, router_buy, router_status, router_trademark, router_type, router_vehicle, router_roles
from backend.database.db import lifespan


app = FastAPI(
    title="API de Venta de Vehículos",
    description="Una API para gestionar la compra y venta de vehículos.",
    version="1.0.0",
    lifespan = lifespan
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # o ["*"] para permitir todos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(router_roles.router)
app.include_router(router_users.router)
app.include_router(router_trademark.router)
app.include_router(router_vehicle.router)
app.include_router(router_buy.router)
app.include_router(router_auth.router)
app.include_router(router_status.router)
app.include_router(router_type.router)


@app.get("/bienvenida")
def read_root():
    return {"message": "Bienvenido a la API de Venta de Vehículos"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)