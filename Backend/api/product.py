from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel, ConfigDict
from db.database import connect_db
from db.model.product import Product, Category
from db.model.supplier import Supplier
from datetime import datetime
import cloudinary_config
import cloudinary.uploader

router = APIRouter(prefix="/product", tags=["product"])

class CategorySchema(BaseModel):
    category_id: int
    name: str
    description: str

    model_config = ConfigDict(from_attributes=True)

class ProductSchema(BaseModel):
    product_id: int
    barcode: str
    name: str
    category: CategorySchema
    price: float
    cost_price: float
    supplier_id: int
    status: str
    image: str

    model_config = ConfigDict(from_attributes=True)


@router.get("/", response_model=list[ProductSchema])
async def get_products(db: Session = Depends(connect_db)):
    products = db.query(Product).options(joinedload(Product.category)).all()
    return products


@router.post("/add")
async def add_new_product(
    barcode: str = Form(...),
    name: str = Form(...),
    category_id: int = Form(...),
    price: float = Form(...),
    cost_price: float = Form(...),
    supplier_id: int = Form(...),
    status: str = Form("active"),
    image: UploadFile = File(...),
    db: Session = Depends(connect_db),
):
    
    try:
        image_bytes = await image.read()
        result = cloudinary.uploader.upload(image_bytes, resource_type="image")
        image_url = result.get("secure_url")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")
    
    if db.query(Product).filter(Product.barcode == barcode).first():
        raise HTTPException(status_code=400, detail="Product already exists")

    new_product = Product(
        barcode=barcode,
        name=name,
        category_id=category_id,
        price=price,
        cost_price=cost_price,
        supplier_id=supplier_id,
        status=status,
        image=image_url
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return {"message": "Product added", "product": {
        "product_id": new_product.product_id,
        "name": new_product.name,
        "image": new_product.image
    }}


@router.delete("/{product_id}")
async def delete_product(product_id: int, db: Session = Depends(connect_db)):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    
    return {"message": "Product deleted successfully"}