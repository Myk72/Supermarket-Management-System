from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db.database import connect_db
from db.model.product import Category

class CategoryBase(BaseModel):
    name: str
    description: str

router = APIRouter(prefix="/category", tags=["category"])

@router.get("/")
async def get_categories(db: Session = Depends(connect_db)):
    return db.query(Category).all()

@router.post("/")
async def add_category(data: CategoryBase, db: Session = Depends(connect_db)):
    existing = db.query(Category).filter_by(name=data.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")


    new_category = Category(name=data.name, description=data.description)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return {
        "message": "Category added successfully",
    }
