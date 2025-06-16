from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from db.database import connect_db
from pydantic import BaseModel, ConfigDict
from db.model.product import Inventory, Product, Category
from db.model.expireTracker import ExpiryTracker
from api.product import ProductSchema
from datetime import datetime
from schemas.proInvSchema import ProductInventory


class InventoryItem(BaseModel):
    product_id: int
    quantity: int
    reorder_level: int
    location: str
    batch_number: str
    expiry_date: datetime


class InventoryProduct(BaseModel):
    inventory_id: int
    quantity: int
    reorder_level: int
    last_restocked: datetime
    location: str
    product: ProductSchema

    model_config = ConfigDict(from_attributes=True)




router = APIRouter(prefix="/inventory", tags=["Inventory"])

@router.get("/", response_model=List[InventoryProduct])
async def get_inventory(db: Session = Depends(connect_db)):
    inventory_items = db.query(Inventory).options(joinedload(Inventory.product)).all()
    if not inventory_items:
        raise HTTPException(status_code=404, detail="No inventory items found")
    return inventory_items

@router.post("/add")
async def add_inventory_item(
    item: InventoryItem,
    db: Session = Depends(connect_db)
):
    print(item)
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

    # add Expiry Tracker
    expiry_tracker = ExpiryTracker(
        product_id=item.product_id,
        batch_number=item.batch_number,
        expiry_date=item.expiry_date
    )
    db.add(expiry_tracker)

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
    existing_item = db.query(Inventory).filter(Inventory.product_id == item_id).first()
    
    if not existing_item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    
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


@router.get("/low-stock", response_model=List[InventoryProduct])
async def get_low_stock_items(
    db: Session = Depends(connect_db)
):
    low_stock_items = db.query(Inventory).filter(Inventory.quantity <= Inventory.reorder_level).options(joinedload(Inventory.product)).all()
    if not low_stock_items:
        raise HTTPException(status_code=404, detail="No low stock items found")
    return low_stock_items



@router.get("/products-with-inventory/", response_model=List[ProductInventory])
def get_products_with_inventory(db: Session = Depends(connect_db)):
    try:
        products = db.query(Inventory).options(
            joinedload(Inventory.product).joinedload(Product.expiry_trackers)
        ).all()

        return [ProductInventory.model_validate(p, from_attributes=True) for p in products]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@router.get("/inventory-levels-by-category")
async def get_inventory_levels_by_category(db: Session = Depends(connect_db)):
    try:
        results = (
            db.query(
                Category.name.label("category"),
                func.sum(Inventory.quantity).label("quantity"),
                func.sum(Inventory.reorder_level).label("reorder")
            )
            .join(Product, Product.category_id == Category.category_id)
            .join(Inventory, Inventory.product_id == Product.product_id)
            .group_by(Category.name)
            .all()
        )

        inventory_levels = [
            {
                "category": r.category,
                "quantity": int(r.quantity or 0),
                "reorder": int(r.reorder or 0),
            }
            for r in results
        ]
        return inventory_levels

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))