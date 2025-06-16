from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime, date


class ExpiryTrackerSchema(BaseModel):
    expiry_id: int
    product_id: int
    batch_number: str
    expiry_date: date

    model_config = ConfigDict(from_attributes=True)


class ProductBase(BaseModel):
    barcode: str
    name: str
    category_id: int
    price: float
    cost_price: float
    supplier_id: int
    status: str
    image: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ProductWithExpiry(ProductBase):
    expiry_trackers: List[ExpiryTrackerSchema] = []

class InventoryBase(BaseModel):
    quantity: int
    reorder_level: int
    last_restocked: datetime
    location: str

    model_config = ConfigDict(from_attributes=True)

class ProductInventory(InventoryBase):
    product: Optional[ProductWithExpiry] = None