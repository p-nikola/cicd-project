from fastapi import APIRouter, HTTPException, Depends
from models import Game
from database import games_collection
from bson.objectid import ObjectId
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import os, secrets
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
security = HTTPBasic()

# Auth setup
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

def get_current_user(credentials: HTTPBasicCredentials = Depends(security)):
    if not (secrets.compare_digest(credentials.username, ADMIN_USERNAME) and
            secrets.compare_digest(credentials.password, ADMIN_PASSWORD)):
        raise HTTPException(status_code=401, detail="Unauthorized", headers={"WWW-Authenticate": "Basic"})
    return credentials.username

# CRUD routes
@router.get("/games")
def list_games(user: str = Depends(get_current_user)):
    return [{**g, "_id": str(g["_id"])} for g in games_collection.find()]

@router.post("/games")
def create_game(game: Game, user: str = Depends(get_current_user)):
    result = games_collection.insert_one(game.dict())
    return {"id": str(result.inserted_id)}

@router.put("/games/{game_id}")
def update_game(game_id: str, game: Game, user: str = Depends(get_current_user)):
    result = games_collection.update_one({"_id": ObjectId(game_id)}, {"$set": game.dict()})
    if result.matched_count:
        return {"message": "Game updated"}
    raise HTTPException(404, "Game not found")

@router.delete("/games/{game_id}")
def delete_game(game_id: str, user: str = Depends(get_current_user)):
    result = games_collection.delete_one({"_id": ObjectId(game_id)})
    if result.deleted_count:
        return {"message": "Game deleted"}
    raise HTTPException(404, "Game not found")
