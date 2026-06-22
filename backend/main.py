from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from backend.database import engine, get_db
from backend import models, schema

app = FastAPI()

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