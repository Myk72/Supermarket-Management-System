from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.userSchema import UserRegister, UserLogin, SetPasswordRequest,EmployeeBase
from db.model.employee import User, Employee
from db.database import connect_db
from datetime import datetime

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/")
async def get_all_employees(db: Session = Depends(connect_db)):
    employees = db.query(Employee).all()
    return employees

@router.get("/{id}")
async def get_employee_by_id(id: int, db: Session = Depends(connect_db)):
    employee = db.query(Employee).filter(Employee.employee_id == id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee