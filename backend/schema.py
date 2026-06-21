from pydantic import BaseModel


class LivroBase(BaseModel):
    titulo: str
    autor: str
    url_imagem: str
    disponivel: bool = True


class LivroCreate(LivroBase):
    pass


class LivroResponse(LivroBase):
    id: int

    class Config:
        from_attributes = True

