from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey, Enum, Text, DateTime
from sqlalchemy.sql import func
from db.database import Base
from .supplier import Supplier
from sqlalchemy.orm import relationship

class Product(Base):
    __tablename__ = "products"
    
    product_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    barcode = Column(String(50), unique=True)
    name = Column(String(100), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.category_id"))
    price = Column(Float(10, 2), nullable=False)
    cost_price = Column(Float(10, 2))
    supplier_id = Column(Integer, ForeignKey(Supplier.supplier_id))
    status = Column(Enum('active', 'discontinued', 'out_of_stock'), default='active')
    image = Column(String(255))
    created_at = Column(DateTime, server_default=func.now())
    inventory = relationship("Inventory", back_populates="product", uselist=False)

    category = relationship("Category", back_populates="products")
    expiry_trackers = relationship("ExpiryTracker", back_populates="product")
    discounts = relationship("Discount", back_populates="product")


class Category(Base):
    __tablename__ = "categories"
    
    category_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    description = Column(Text)

    products = relationship("Product", back_populates="category")




class Inventory(Base):
    __tablename__ = "inventory"
    
    inventory_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id"))
    quantity = Column(Integer, default=0)
    reorder_level = Column(Integer, default=10)
    last_restocked = Column(DateTime, server_default=func.now())
    location = Column(String(50))
    product = relationship("Product", back_populates="inventory")


class Discount(Base):
    __tablename__ = "discounts"
    
    discount_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id"))
    name = Column(String(100))
    percentage = Column(Float(5, 2))
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)

    product = relationship("Product", back_populates="discounts")