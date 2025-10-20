from fastapi import FastAPI

app = FastAPI(
    title = "AJSport"
)

@app.get("/")
async def prueba():
    return {"messege" : "prueba"}