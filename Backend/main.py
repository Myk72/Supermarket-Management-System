from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import user as user_routes
from api import auth as auth_routes
from api import customer as customer_routes
from api import product as product_routes
from api import supplier
from api import category
from api import inventory
from api import sales
from api import purchase
from api import returnProduct
from db.database import Base, engine
from db.model import *
import socketio

scanned_data = ""
Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:8000",
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
app.include_router(customer_routes.router)
app.include_router(product_routes.router)
app.include_router(supplier.router)
app.include_router(category.router)
app.include_router(inventory.router)
app.include_router(sales.router)
app.include_router(purchase.router)
app.include_router(returnProduct.router)


sio = socketio.AsyncServer(cors_allowed_origins='*', async_mode='asgi')
socket_app = socketio.ASGIApp(sio, other_asgi_app=app)


@app.get("/")
def read_root():
    return {"message": "Welcome to SMS"}



@sio.event
async def connect(sid, environ):
    if environ['HTTP_ORIGIN'].startswith('https://'):
        print(f"Client connected via https: {sid}")
    else:
        print(f"Client connected via http: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio.event
async def scan(sid, data):
    global scanned_data
    scanned_data = data
    await sio.emit("scanned-code", data)


@sio.event
async def register_display(sid):
    print(scanned_data, "register_display called")
    await sio.emit("initial-codes", scanned_data, to=sid)
