from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session, joinedload
from db.database import connect_db
from pydantic import BaseModel
from db.model.product import Inventory
from db.model.product import Product
from datetime import datetime
from schemas.proInvSchema import ProductInventory


class InventoryItem(BaseModel):
    product_id: int
    quantity: int
    reorder_level: int
    location: str


router = APIRouter(prefix="/inventory", tags=["Inventory"])

@router.get("/")
async def get_inventory(db: Session = Depends(connect_db)):
    return db.query(Inventory).all()

@router.post("/add")
async def add_inventory_item(
    item: InventoryItem,
    db: Session = Depends(connect_db)
):
    existing_item = db.query(Inventory).filter(Inventory.product_id == item.product_id).first()
    
    if existing_item:
        raise HTTPException(status_code=400, detail="Inventory item already exists")
    
    new_item = Inventory(
        product_id=item.product_id,
        quantity=item.quantity,
        reorder_level=item.reorder_level,
        location=item.location,
        last_restocked=datetime.now()
    )
    
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    
    return {"message": "Inventory item added", "item": new_item}

@router.put("/{item_id}")
async def update_inventory_item(
    item_id: int,
    item: InventoryItem,
    db: Session = Depends(connect_db)
):
    existing_item = db.query(Inventory).filter(Inventory.inventory_id == item_id).first()
    
    if not existing_item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    
    existing_item.product_id = item.product_id
    existing_item.quantity = item.quantity
    existing_item.reorder_level = item.reorder_level
    existing_item.location = item.location
    existing_item.last_restocked = datetime.now()
    
    db.commit()
    db.refresh(existing_item)
    
    return {"message": "Inventory item updated", "item": existing_item}

@router.delete("/{item_id}")
async def delete_inventory_item(item_id: int, db: Session = Depends(connect_db)):
    existing_item = db.query(Inventory).filter(Inventory.inventory_id == item_id).first()
    
    if not existing_item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    
    db.delete(existing_item)
    db.commit()
    
    return {"message": "Inventory item deleted"}

@router.patch("/{item_id}")
async def restock_inventory_item(
    item_id: int,
    quantity: int,
    db: Session = Depends(connect_db)
):
    existing_item = db.query(Inventory).filter(Inventory.inventory_id == item_id).first()
    
    if not existing_item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    
    existing_item.quantity += quantity
    if quantity > 0:
        existing_item.last_restocked = datetime.now()


    db.commit()
    db.refresh(existing_item)
    
    return {"message": "Inventory item restocked", "item": existing_item}


@router.get("/low-stock")
async def get_low_stock_items(
    db: Session = Depends(connect_db)
):
    low_stock_items = db.query(Inventory).filter(Inventory.quantity <= Inventory.reorder_level).all()
    
    if not low_stock_items:
        raise HTTPException(status_code=404, detail="No low stock items found")
    
    return low_stock_items



@router.get("/products-with-inventory/", response_model=List[ProductInventory])
def get_products_with_inventory(db: Session = Depends(connect_db)):
    try:
        products = db.query(Inventory).options(joinedload(Inventory.product)).all()
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))