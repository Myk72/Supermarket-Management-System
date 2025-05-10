from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/")
def create_new_user():
    return {"message": "User created successfully"}
    

@router.get("/")
def get_users():
    return {"message": "List of users"}
