from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from pydantic import BaseModel, ConfigDict
from db.database import connect_db
from db.model.sales import Sale

from db.model.returnProduct import Return

router = APIRouter(prefix="/returns", tags=["Returns"])

@router.get("/")
async def get_returns(db: Session = Depends(connect_db)):
    returns = db.query(Return).all()
    return returns

class ReturnProduct(BaseModel):
    product_id: int
    quantity: int
    unit_price: float
    reason: str
    total_refund: float

class ReturnRequest(BaseModel):
    sale_id: int
    products: List[ReturnProduct]
    processed_by: int

@router.post("/")
async def add_returns(data: ReturnRequest, db: Session = Depends(connect_db)):
    created_returns = []

    for item in data.products:
        new_return = Return(
            sale_id=data.sale_id,
            product_id=item.product_id,
            quantity=item.quantity,
            return_reason=item.reason,
            refund_amount=item.total_refund,
            processed_by=data.processed_by
        )
        db.add(new_return)
        created_returns.append(new_return)

    db.commit()
    for r in created_returns:
        db.refresh(r)

    return {
        "message": "Returns processed successfully",
        "returns": created_returns
    }


@router.get("/pending")
async def get_pending_returns(db: Session = Depends(connect_db)):
    pending_returns = db.query(Return).filter(Return.status == "pending").all()
    return pending_returns


@router.patch("/{return_id}/{action}")
async def approve_return(return_id: int, action:str , db: Session = Depends(connect_db)):
    print(f"Approving return with ID: {return_id} and action: {action}")
    return_record = db.query(Return).filter(Return.return_id == return_id).first()
    if not return_record:
        raise HTTPException(status_code=404, detail="Return not found")

    return_record.status = action 
    db.commit()
    db.refresh(return_record)

    return {
        "message": f"Return {action} successfully",
        "return": return_record
    }