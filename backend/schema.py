from pydantic import BaseModel


class LivroBase(BaseModel):
    titulo: str
    autor: str
    url_imagem: str
    disponivel: bool = True

