from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel, EmailStr, ConfigDict
from db.database import connect_db
from db.model.purchase import Purchase, PurchaseItem
from db.model.supplier import Supplier
from db.model.employee import Employee
from datetime import datetime


router = APIRouter(prefix="/purchase", tags=["Purchase"])

class SupplierBase(BaseModel):
    supplier_id: int
    name: str
    contact_phone: str
    email: EmailStr
    address: str
    status: str = "active"
    total_purchases: int = 0


    model_config = ConfigDict(from_attributes=True)
class EmployeeSchema(BaseModel):
    employee_id: int
    firstName: str
    lastName: str

    model_config = ConfigDict(from_attributes=True)

class PurchaseSchema(BaseModel):
    purchase_id: int
    total_cost: float
    expected_date: datetime
    note: str | None = None
    status: str = 'pending'
    supplier: SupplierBase
    employee: EmployeeSchema

    model_config = ConfigDict(from_attributes=True)


    

class purchaseItemBase(BaseModel):
    product_id: int
    quantity: int
    cost_price: float

    model_config = ConfigDict(from_attributes=True)

class createPurchase(BaseModel):
    supplier_id: int
    employee_id: int
    total_cost: float
    expected_date: datetime
    note: str = None
    status: str = 'pending'

    items: list[purchaseItemBase]

    model_config = ConfigDict(from_attributes=True)




@router.get("/", response_model=list[PurchaseSchema])
async def get_purchases(db: Session = Depends(connect_db)):
    purchases = db.query(Purchase).options(
        joinedload(Purchase.supplier),
        joinedload(Purchase.employee)
    ).order_by(Purchase.createdAt.desc()).all()
    return purchases

@router.post("/")
async def add_purchase(data: createPurchase, db: Session = Depends(connect_db)):
    print(data)
    purchase = Purchase(
        supplier_id=data.supplier_id,
        employee_id=data.employee_id,
        total_cost=data.total_cost,
        expected_date=data.expected_date,
        note=data.note,
        status=data.status
    )
    
    db.add(purchase)
    db.commit()
    db.refresh(purchase)

    for item in data.items:
        purchase_item = PurchaseItem(
            purchase_id=purchase.purchase_id,
            product_id=item.product_id,
            quantity=item.quantity,
            cost_price=item.cost_price
        )
        db.add(purchase_item)
    
    db.commit()
    
    return {"message": "Purchase added successfully", "purchase_id": purchase.purchase_id}


@router.get("/{purchase_id}")
async def get_purchase(purchase_id: int, db: Session = Depends(connect_db)):
    purchaseitem = db.query(PurchaseItem).filter(PurchaseItem.purchase_id == purchase_id).all()
    if not purchaseitem:
        raise HTTPException(status_code=404, detail="Purchase not found")
    return purchaseitem


@router.delete("/{purchase_id}")
async def delete_purchase(purchase_id: int, db: Session = Depends(connect_db)):
    purchase = db.query(Purchase).filter(Purchase.purchase_id == purchase_id).first()
    if not purchase:
        raise HTTPException(status_code=404, detail="Purchase not found")
    
    db.delete(purchase)
    db.commit()
    
    return {"message": "Purchase deleted successfully"}