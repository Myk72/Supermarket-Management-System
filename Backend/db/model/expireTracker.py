from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.database import Base
from .product import Product

class ExpiryTracker(Base):
    __tablename__ = "expiry_tracker"
    
    expiry_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey(Product.product_id))
    batch_number = Column(String(50))
    expiry_date = Column(Date, nullable=False)
    product = relationship("Product", back_populates="expiry_trackers")