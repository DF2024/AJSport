import os
from fastapi import UploadFile, HTTPException
from uuid import uuid4

MEDIA_DIR = "media/vehicles"

# Crear carpeta si no existe
os.makedirs(MEDIA_DIR, exist_ok=True)

async def save_vehicle_image(image: UploadFile, vehicle_id: int) -> str:
    try:
        extension = os.path.splitext(image.filename)[1]
        filename = f"{vehicle_id}_{uuid4().hex}{extension}"
        file_path = os.path.join(MEDIA_DIR, filename)

        with open(file_path, "wb") as f:
            content = await image.read()
            f.write(content)

        return file_path
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al guardar imagen: {str(e)}")

def delete_vehicle_image(image_path: str):
    if os.path.exists(image_path):
        os.remove(image_path)
