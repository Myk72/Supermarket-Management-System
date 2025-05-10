from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from db.database import Base

class Customer(Base):
    __tablename__ = "customers"
    
    customer_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    firstName = Column(String(100), nullable=False)
    lastName = Column(String(100), nullable=False)
    phone = Column(String(20), unique=True)
    email = Column(String(100))
    loyalty_points = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())