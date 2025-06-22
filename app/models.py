from pydantic import BaseModel

class Game(BaseModel):
    title: str
    studio: str
    genre: str
    price: float
