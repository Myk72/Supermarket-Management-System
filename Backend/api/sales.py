from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, ConfigDict
from db.database import connect_db
from db.model.sales import Sale, SaleItem
from db.model.product import Inventory

router = APIRouter(prefix="/sales", tags=["Sales"])

class SaleBase(BaseModel):
    customer_id: int = None
    employee_id: int
    total_amount: float
    tax_amount: float = 0.0
    discount_amount: float = 0.0
    payment_method: str

class SaleItemCreate(BaseModel):
    product_id: int
    quantity: int
    unit_price: float
    subtotal: float = None

    model_config = ConfigDict(from_attributes=True)

class SaleCreate(BaseModel):
    customer_id: int = None
    employee_id: int
    payment_method: str
    tax_amount: float = 0.0
    discount_amount: float = 0.0
    total_amount: float = 0.0
    items: list[SaleItemCreate]
    model_config = ConfigDict(from_attributes=True)




@router.get("/")
async def get_sales(db: Session = Depends(connect_db)):
    return db.query(Sale).all()

@router.post("/")
async def add_sale(data: SaleCreate, db: Session = Depends(connect_db)):
    sale = Sale(
        employee_id=data.employee_id,
        total_amount=data.total_amount,
        tax_amount=data.tax_amount,
        discount_amount=data.discount_amount,
        payment_method=data.payment_method, 
    )
    if data.customer_id >= 0:
        sale.customer_id = data.customer_id
    
    db.add(sale)
    db.commit()
    db.refresh(sale)

    for item in data.items:
        sale_item = SaleItem(
            sale_id=sale.sale_id,
            product_id=item.product_id,
            quantity=item.quantity,
            unit_price=item.unit_price,
            subtotal=item.subtotal
        )
        db.add(sale_item)
    
    for item in data.items:
        inventory = db.query(Inventory).filter(Inventory.product_id == item.product_id).first()
        if inventory:
            inventory.quantity -= item.quantity
            db.add(inventory)


    db.commit()
    db.refresh(sale)
    
    return {"message": "Sale added successfully", "sale_id": sale.sale_id}



@router.get("/{sale_id}")
async def get_sale(sale_id: int, db: Session = Depends(connect_db)):
    sale = db.query(Sale).filter(Sale.sale_id == sale_id).first()
    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    sale_items = db.query(SaleItem).filter(SaleItem.sale_id == sale_id).all()
    return sale_items


@router.delete("/{sale_id}")
async def delete_sale(sale_id: int, db: Session = Depends(connect_db)):
    sale = db.query(Sale).filter(Sale.sale_id == sale_id).first()
    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    
    db.delete(sale)
    db.commit()
    
    return {"message": "Sale deleted successfully"}


# get sales by employee
@router.get("/employee/{employee_id}")
async def get_sales_by_employee(employee_id: int, db: Session = Depends(connect_db)):
    sales = db.query(Sale).filter(Sale.employee_id == employee_id).all()
    if not sales:
        raise HTTPException(status_code=404, detail="No sales found for this employee")
    return sales
