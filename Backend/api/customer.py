from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.model.customer import Customer
from db.database import connect_db
from schemas.customerSchema import CustomerBase
from datetime import datetime, timedelta

router = APIRouter(prefix="/customer", tags=["customer"])

@router.get("/")
async def get_customers(db: Session = Depends(connect_db)):
    customers = db.query(Customer).all()
    return customers

@router.post("/register")
async def register_customer(data:CustomerBase, db: Session = Depends(connect_db)):
    print(data)
    if db.query(Customer).filter(Customer.email == data.email).first():
        raise HTTPException(status_code=400, detail="Customer already exists")
    new_customer = Customer(
        firstName=data.firstName,
        lastName=data.lastName,
        email = data.email,
        idType=data.idType,
        idNumber=data.idNumber,
        dateOfBirth=data.dateOfBirth,
        phone=data.phone,
        address=data.address,
    )

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    return {"message": "Customer has registered successfully"}


@router.get("/monthly")
async def get_monthly_customers(db: Session = Depends(connect_db)):
    current_date = datetime.now()
    start_date = current_date - timedelta(days=365)
    
    monthly_customers = db.query(Customer).filter(Customer.created_at >= start_date).all()
    
    
    monthly_count = {}
    for customer in monthly_customers:
        month = customer.created_at.strftime("%Y-%m")
        if month not in monthly_count:
            monthly_count[month] = 0
        monthly_count[month] += 1
    return [{"date": date, "count": count} for date, count in monthly_count.items()]


@router.put("/{customer_id}")
async def update_customer(customer_id: int, data: CustomerBase, db: Session = Depends(connect_db)):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    customer.firstName = data.firstName
    customer.lastName = data.lastName
    customer.email = data.email
    customer.idType = data.idType
    customer.idNumber = data.idNumber
    customer.dateOfBirth = data.dateOfBirth
    customer.phone = data.phone
    customer.address = data.address

    db.commit()
    db.refresh(customer)

    return {"message": "Customer updated successfully"}
