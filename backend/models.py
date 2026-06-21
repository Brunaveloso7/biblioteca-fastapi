from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class Livro(Base):
    __tablename__ = "livros"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, index=True)
    autor = Column(String)
    url_imagem = Column(String)
    disponivel = Column(Boolean, default=True)