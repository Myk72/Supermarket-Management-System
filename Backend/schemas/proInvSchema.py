from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

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

class InventoryBase(BaseModel):
    quantity: int
    reorder_level: int
    last_restocked: datetime
    location: str

    model_config = ConfigDict(from_attributes=True)
        
class ProductInventory(InventoryBase):
    product: Optional[ProductBase] = None 