from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import user as user_routes
from api import auth as auth_routes
from db.database import Base, engine
from db.model import *

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:8000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],    
)


app.include_router(user_routes.router)
app.include_router(auth_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to SMS"}
