from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Bem-vindo à API da Biblioteca!"}