from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# Get MongoDB credentials from environment
mongo_username = os.getenv("MONGO_ROOT_USERNAME")
mongo_password = os.getenv("MONGO_ROOT_PASSWORD")

if mongo_username and mongo_password:
    # Use credentials - assume replica set in k8s
    MONGO_URL = f"mongodb://{mongo_username}:{mongo_password}@mongo-0.mongo:27017,mongo-1.mongo:27017,mongo-2.mongo:27017/mydatabase?authSource=admin&replicaSet=rs0"
else:
    # Fallback to ConfigMap or simple connection
    MONGO_URL = os.getenv("MONGO_URL", "mongodb://mongo:27017/mydatabase")

print(f"Connecting to MongoDB: {MONGO_URL}")
client = MongoClient(MONGO_URL)
db = client["mydatabase"]
games_collection = db["games"]