from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, ConfigDict
from sqlalchemy import func, text

from db.database import connect_db
from db.model.sales import Sale, SaleItem
from db.model.product import Inventory, Product
from db.model.customer import Customer

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
    sales = db.query(Sale).order_by(Sale.sale_date.desc()).all()
    if not sales:
        raise HTTPException(status_code=404, detail="No sales found")
    return sales


@router.get("/top-products")
async def get_top_products(db: Session = Depends(connect_db)):
    top_products = (
        db.query(
            Product.name,
            func.sum(SaleItem.quantity).label('total_sold')
        )
        .join(SaleItem, SaleItem.product_id == Product.product_id)
        .group_by(Product.product_id)
        .order_by(func.sum(SaleItem.quantity).desc())
        .limit(5)
        .all()
    )

    return [{"name": row.name, "total_sold": row.total_sold} for row in top_products]


@router.get("/customer/{customer_id}")
async def get_sales_by_customer(customer_id: int, db: Session = Depends(connect_db)):
    sales = db.query(Sale).filter(Sale.customer_id == customer_id).all()
    if not sales:
        raise HTTPException(status_code=404, detail="No sales found for this customer")
    sales.sort(key=lambda x: x.sale_date, reverse=True)
    return sales




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
        )
        db.add(sale_item)
    
    for item in data.items:
        inventory = db.query(Inventory).filter(Inventory.product_id == item.product_id).first()
        if inventory:
            inventory.quantity -= item.quantity
            db.add(inventory)

    if data.customer_id is not None:
        customer = db.query(Customer).filter(Customer.customer_id == data.customer_id).first()
        if customer:
            customer.loyalty_points += int(data.total_amount // 20)


    db.commit()
    db.refresh(sale)
    
    return {"message": "Sale added successfully", "sale_id": sale.sale_id}


@router.get("/{sale_id}")
async def get_sale(sale_id: int, db: Session = Depends(connect_db)):
    sale = db.query(Sale).filter(Sale.sale_id == sale_id).first()
    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")
    return sale


@router.get("/{sale_id}/items")
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

@router.get("/revenue/daily")
async def get_daily_revenue(db: Session = Depends(connect_db)):
    today = func.current_date()
    thirty_days_ago = today - text("INTERVAL 30 DAY")

    daily_revenue = (
        db.query(
            func.date(Sale.sale_date).label('day'),
            func.sum(Sale.total_amount).label('total_revenue')
        )
        .filter(Sale.sale_date >= thirty_days_ago)
        .group_by(func.date(Sale.sale_date))
        .order_by(func.date(Sale.sale_date))
        .all()
    )

    return [{"date": row.day.strftime("%Y-%m-%d"), "revenue": round(float(row.total_revenue), 2)} for row in daily_revenue]

