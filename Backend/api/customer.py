from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.model.customer import Customer
from db.database import connect_db
from schemas.customerSchema import CustomerBase

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