from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from db.database import connect_db
from db.model.supplier import Supplier

class SupplierBase(BaseModel):
    name: str
    contact_phone: str
    email: EmailStr
    address: str
    status: str

router = APIRouter(prefix="/supplier", tags=["Supplier"])

@router.get("/")
async def get_categories(db: Session = Depends(connect_db)):
    return db.query(Supplier).all()

@router.post("/")
async def add_supplier(data: SupplierBase, db: Session = Depends(connect_db)):
    existing = db.query(Supplier).filter_by(email = data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Supplier already exists")

    new_supplier = Supplier(
        name=data.name,
        contact_phone=data.contact_phone,
        email=data.email,
        address=data.address,
        status=data.status
        )
    
    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)

    return {
        "message": "Supplier added successfully",
    }
