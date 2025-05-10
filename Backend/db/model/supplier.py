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