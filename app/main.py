from fastapi import FastAPI
from routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",             # dev
        "http://game.local",                 # k8s frontend
        "http://api.local",                  # k8s backend
        "https://safetycrew.xyz",            # frontend domain
        "https://test.safetycrew.xyz"        # backend domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)