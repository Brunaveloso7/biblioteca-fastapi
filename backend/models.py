from sqlalchemy import Column, Integer, String, Boolean
from .database import Base


class Livro(Base):
    __tablename__ = "livros"


    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    autor = Column(String, nullable=False)
    url_imagem = Column(String, nullable=False)
    disponivel = Column(Boolean, default=True)