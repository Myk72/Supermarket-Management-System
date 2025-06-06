from fastapi import FastAPI
from api import user as user_routes
from api import auth as auth_routes
from db.database import Base, engine
from db.model import *

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(user_routes.router)
app.include_router(auth_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to SMS"}
