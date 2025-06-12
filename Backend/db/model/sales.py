from sqlalchemy import Column, Integer, String, Date, DateTime, Float, ForeignKey, Enum, Text
from sqlalchemy.sql import func
from db.database import Base
from .customer import Customer
from .employee import Employee
from .product import Product

class Sale(Base):
    __tablename__ = "sales"
    
    sale_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey(Customer.customer_id), nullable=True)
    employee_id = Column(Integer, ForeignKey(Employee.employee_id))
    total_amount = Column(Float(12, 2), nullable=False)
    tax_amount = Column(Float(10, 2), default=0)
    discount_amount = Column(Float(10, 2), default=0)
    payment_method = Column(Enum('cash', 'card', 'mobile_money'), default='cash')
    sale_date = Column(DateTime, server_default=func.now())

class SaleItem(Base):
    __tablename__ = "sale_items"
    
    sale_item_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sale_id = Column(Integer, ForeignKey("sales.sale_id"))
    product_id = Column(Integer, ForeignKey(Product.product_id))
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float(10, 2), nullable=False)
    subtotal = Column(Float(10, 2))