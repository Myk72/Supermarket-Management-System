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


@router.delete("/{supplier_id}")
async def delete_supplier(supplier_id: int, db: Session = Depends(connect_db)):
    supplier = db.query(Supplier).filter_by(supplier_id=supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")

    db.delete(supplier)
    db.commit()

    return {
        "message": "Supplier deleted successfully",
    }


@router.put("/{supplier_id}")
async def update_supplier(supplier_id: int, data: SupplierBase, db: Session = Depends(connect_db)):
    supplier = db.query(Supplier).filter_by(supplier_id=supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")

    existing = db.query(Supplier).filter(Supplier.email == data.email, Supplier.supplier_id != supplier_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already in use by another supplier")

    supplier.name = data.name
    supplier.contact_phone = data.contact_phone
    supplier.email = data.email
    supplier.address = data.address
    supplier.status = data.status

    db.commit()
    db.refresh(supplier)

    return {
        "message": "Supplier updated successfully",
        "supplier": supplier
    }