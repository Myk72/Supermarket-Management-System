from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.sql import func
from db.database import Base

class Supplier(Base):
    __tablename__ = "suppliers"
    
    supplier_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    contact_phone = Column(String(20))
    email = Column(String(100))
    address = Column(Text)
    status = Column(String(20), default="active")
    total_purchases = Column(Integer, default=0)
    created_at = Column(String(50), server_default=func.now())