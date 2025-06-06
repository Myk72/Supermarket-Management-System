from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from utils import utils
from schemas.userSchema import UserRegister, UserLogin
from db.model.employee import User, Employee
from db.database import connect_db
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["auth"])



@router.post("/register")
def register(user_data: UserRegister, db: Session = Depends(connect_db)):

    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    new_employee = Employee(
        firstName=user_data.firstName,
        lastName=user_data.lastName,
        role=user_data.role,
        salary=user_data.salary,
        hire_date=user_data.hire_date,
        phone=user_data.phone,
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    hashed_pw = utils.hash_password(user_data.password)
    new_user = User(
        employee_id=new_employee.employee_id,
        email=user_data.email,
        password=hashed_pw,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}



@router.post("/login")
def login(credentials: UserLogin, db: Session = Depends(connect_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not utils.verify_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user.last_login = datetime.now()
    db.commit()

    return {"message": "Login successful", "employee_id": user.employee_id}
