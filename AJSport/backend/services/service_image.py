import os
from uuid import uuid4
from fastapi import UploadFile, HTTPException

# Carpeta donde se guardan las imágenes de vehículos
MEDIA_DIR = "backend/media/vehicles"

# Asegurarse de que la carpeta exista
os.makedirs(MEDIA_DIR, exist_ok=True)

async def save_vehicle_image(image: UploadFile, vehicle_id: int) -> str:
    """
    Guarda la imagen en MEDIA_DIR y retorna la ruta relativa
    Ejemplo: vehicles/1_abcd1234.jpg
    """
    try:
        extension = os.path.splitext(image.filename)[1]  # .jpg, .png
        filename = f"{vehicle_id}_{uuid4().hex}{extension}"
        file_path = os.path.join(MEDIA_DIR, filename)

        # Guardar archivo
        with open(file_path, "wb") as f:
            content = await image.read()
            f.write(content)

        # Retornamos ruta relativa a 'media/'
        return f"vehicles/{filename}"

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al guardar imagen: {str(e)}")


def delete_vehicle_image(image_path: str):
    """
    Elimina la imagen del disco
    """
    try:
        file_path = os.path.join("backend/media", image_path)
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar imagen: {str(e)}")
