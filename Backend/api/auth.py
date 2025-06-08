from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from utils import utils
from schemas.userSchema import UserRegister, UserLogin, SetPasswordRequest
from db.model.employee import User, Employee
from db.database import connect_db
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["auth"])



from utils.utils import hash_password, verify_password, generate_token, send_email, verify_token


@router.post("/register")
async def register(user_data: UserRegister, db: Session = Depends(connect_db)):
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")
    token = generate_token(user_data.email)
    new_employee = Employee(
        firstName=user_data.firstName,
        lastName=user_data.lastName,
        role=user_data.role,
        salary=user_data.salary,
        hire_date=user_data.hire_date,
        phone=user_data.phone,
        token=token,
    )
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    new_user = User(
        employee_id=new_employee.employee_id,
        email=user_data.email,
        password=hash_password("temporary_password"),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    
    await send_email(user_data.email, token)

    return {"message": "User has been registered successfully"}


@router.post("/login")
def login(credentials: UserLogin, db: Session = Depends(connect_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user.last_login = datetime.now()
    db.commit()
    db.refresh(user)

    return {"message": "Login successful", "employee_id": user.employee_id}



@router.post("/set-password")
def set_password(data: SetPasswordRequest, db: Session = Depends(connect_db)):
    # print("Received token:", data)
    email = verify_token(data.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user = db.query(User).filter_by(email=email).first()
    employee = db.query(Employee).filter_by(employee_id=user.employee_id).first()
    # print("User found:", user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not employee.token:
        raise HTTPException(status_code=400, detail="Token has already been used or is invalid")
    

    user.password = utils.hash_password(data.password)

    db.commit()

    employee.is_authenticated = True
    employee.token = None
    db.commit()
    db.refresh(user)

    return {"message": "Password has been set successfully",
            "user": user}