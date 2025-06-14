from sqlalchemy import Column, Integer, DateTime, Float, ForeignKey,Text, Enum
from sqlalchemy.sql import func
from db.database import Base
from .sales import Sale
from .employee import Employee
from .product import Product

class Return(Base):
    __tablename__ = "returns"
    
    return_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sale_id = Column(Integer, ForeignKey(Sale.sale_id))
    product_id = Column(Integer, ForeignKey(Product.product_id))
    quantity = Column(Integer, nullable=False)
    return_reason = Column(Text)
    refund_amount = Column(Float(10, 2))
    status = Column(Enum('pending', 'approved', 'rejected'), default='pending')
    processed_by = Column(Integer, ForeignKey(Employee.employee_id))
    processed_at = Column(DateTime, server_default=func.now())