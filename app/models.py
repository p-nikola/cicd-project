from pydantic import BaseModel,Field

class Game(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    studio: str = Field(..., min_length=1, max_length=100)
    genre: str = Field(..., min_length=1, max_length=50)
    price: float = Field(..., ge=0)
