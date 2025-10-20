# En: backend/schema/__init__.py

# ====================================================================
# PASO 1: Importa TODAS las clases de esquema.
# ====================================================================

from .schema_user import UserRead, UserUpdate, UserCreate # Importa todos los que uses
from .schema_vehicle import VehicleRead, VehicleReadWithDetails, VehicleUpdate, VehicleCreate
from .schema_trademark import TrademarkRead, TrademarkReadWithVehicles, TrademarkCreate
from .schema_buy import BuyRead, BuyReadWithDetails, BuyUpdate, BuyCreate
from .schema_status import StatusRead,  StatusCreate
from .schema_type import VehicleTypeRead, VehicleTypeCreate

# ====================================================================
# PASO 2: Llama a .model_rebuild() en CADA esquema que tenga relaciones
#         o pueda ser usado en un response_model con relaciones anidadas.
#         Para estar seguros, lo haremos en todos los esquemas de lectura.
# ====================================================================

# Esquemas de lectura básicos
UserRead.model_rebuild()
VehicleRead.model_rebuild()
TrademarkRead.model_rebuild()
BuyRead.model_rebuild()
StatusRead.model_rebuild()
VehicleTypeRead.model_rebuild()

# Esquemas de lectura compuestos (con detalles)
VehicleReadWithDetails.model_rebuild()
TrademarkReadWithVehicles.model_rebuild()
BuyReadWithDetails.model_rebuild()
# UserReadWithDetails.model_rebuild() # Si lo tienes