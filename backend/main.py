from fastapi import FastAPI

app = FastAPI()

from backend.database import engine
from backend import models

models.Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"mensagem": "API da biblioteca funcionando"}