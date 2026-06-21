from fastapi import fastapi
app = FastAPI()

from backend.database import engine
from backend import models

models.Base.metadata.create_all(bind=engine)