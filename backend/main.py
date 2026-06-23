from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from backend.database import engine, get_db
from backend import models, schema

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"mensagem": "API da biblioteca funcionando"}


@app.get("/livros")
def listar_livros(db: Session = Depends(get_db)):
    livros = db.query(models.Livro).all()
    return livros


@app.post("/livros")
def criar_livro(
    livro: schema.LivroCreate,
    db: Session = Depends(get_db)
):
    novo_livro = models.Livro(
        titulo=livro.titulo,
        autor=livro.autor,
        url_imagem=livro.url_imagem,
        disponivel=livro.disponivel
    )

    db.add(novo_livro)
    db.commit()
    db.refresh(novo_livro)

    return novo_livro


@app.get("/livros/{livro_id}")
def buscar_livro(livro_id: int, db: Session = Depends(get_db)):
    livro = db.query(models.Livro).filter(models.Livro.id == livro_id).first()

    if livro is None:
        return {"erro": "Livro não encontrado"}

    return livro


@app.put("/livros/{livro_id}")
def atualizar_livro(
    livro_id: int,
    livro: schema.LivroCreate,
    db: Session = Depends(get_db)
):
    livro_db = db.query(models.Livro).filter(models.Livro.id == livro_id).first()

    if livro_db is None:
        return {"erro": "Livro não encontrado"}

    livro_db.titulo = livro.titulo
    livro_db.autor = livro.autor
    livro_db.url_imagem = livro.url_imagem
    livro_db.disponivel = livro.disponivel

    db.commit()
    db.refresh(livro_db)

    return livro_db


@app.delete("/livros/{livro_id}")
def deletar_livro(livro_id: int, db: Session = Depends(get_db)):
    livro = db.query(models.Livro).filter(models.Livro.id == livro_id).first()

    if livro is None:
        return {"erro": "Livro não encontrado"}

    db.delete(livro)
    db.commit()

    return {"mensagem": "Livro removido com sucesso"}