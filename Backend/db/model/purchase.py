from sqlalchemy import Column, Integer, DateTime, Float, ForeignKey, Enum, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.database import Base
from .employee import Employee
from .product import Product
from .supplier import Supplier

class Purchase(Base):
    __tablename__ = "purchases"
    
    purchase_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    supplier_id = Column(Integer, ForeignKey(Supplier.supplier_id))
    employee_id = Column(Integer, ForeignKey(Employee.employee_id))
    total_cost = Column(Float(12, 2), nullable=False)
    expected_date = Column(DateTime, server_default=func.now())
    note = Column(String(255), nullable=True)
    status = Column(Enum('pending', 'received', 'cancelled'), default='pending')
    createdAt = Column(DateTime, server_default=func.now())

    supplier = relationship("Supplier", back_populates="purchases")
    employee = relationship("Employee", back_populates="purchases")

class PurchaseItem(Base):
    __tablename__ = "purchase_items"
    
    purchase_item_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    purchase_id = Column(Integer, ForeignKey("purchases.purchase_id",ondelete="CASCADE"))
    product_id = Column(Integer, ForeignKey(Product.product_id))
    quantity = Column(Integer, nullable=False)
    cost_price = Column(Float(10, 2), nullable=False)