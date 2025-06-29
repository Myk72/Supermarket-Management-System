from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from utils import utils
from schemas.userSchema import UserRegister, UserLogin, SetPasswordRequest, ForgotPasswordRequest, ChangePasswordRequest
from db.model.employee import User, Employee
from db.database import connect_db
from datetime import datetime
from utils.utils import hash_password, verify_password, generate_token, send_email, verify_token
from utils.jwt import generate_cookie_token, verify_cookie_token

router = APIRouter(prefix="/auth", tags=["auth"])


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
        address=user_data.address,
    )

    await send_email(user_data.email, token)
    
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    new_user = User(
        employee_id=new_employee.employee_id,
        email=user_data.email,
        password=hash_password("temporary_password"),
        token=token,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)


    return {"message": "User has been registered successfully"}


@router.post("/login")
def login(credentials: UserLogin, db: Session = Depends(connect_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user.last_login = datetime.now()
    db.commit()
    db.refresh(user)

    token = generate_cookie_token({"id": user.employee_id, "email": user.email})

    # print(token, "token here")
    # checktoken = verify_cookie_token(token)
    # if checktoken:
    #     print("id here:", checktoken.get("id"))

    response = JSONResponse(content={"message": "Login successful", "id": user.employee_id})
    print("here")

    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=False,
        samesite="Lax",
        max_age=86400,
        path="/"
        )
    return response

@router.post("/logout")
def logout(response: Response):
    res = JSONResponse(content={"message": "Logged out"})
    res.delete_cookie(
        key="token",
        httponly=True,
        samesite="Lax",
        secure=False,
    )
    return res

@router.post("/set-password")
def set_password(data: SetPasswordRequest, db: Session = Depends(connect_db)):
    # print("Received token:", data)
    email = verify_token(data.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user = db.query(User).filter_by(email=email).first()
    # print("User found:", user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # print(user.token, "here")
    if not user.token:
        raise HTTPException(status_code=400, detail="Token has already been used or is invalid")
    
    user.password = utils.hash_password(data.password)

    db.commit()

    user.is_authenticated = True
    user.token = None
    db.commit()
    db.refresh(user)

    return {"message": "Password has been set successfully"}


@router.post("/forgot-password")
async def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(connect_db)):
    email = data.email
    user = db.query(User).filter(User.email == email).first()
    employee = db.query(Employee).filter_by(employee_id=user.employee_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Invalid Email")

    token = generate_token(email)
    employee.token = token
    db.commit()
    db.refresh(user)

    await send_email(email, token)

    return {"message": "Password reset link has been sent to your email"}



@router.patch("/change-password/{emp_id}")
def change_password(emp_id: int, data: ChangePasswordRequest, db: Session = Depends(connect_db)):
    user = db.query(User).filter(User.employee_id == emp_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(data.old_password, user.password):
        raise HTTPException(status_code=400, detail="Old password is incorrect")

    user.password = hash_password(data.new_password)
    db.commit()
    db.refresh(user)

    return {"message": "Password has been changed successfully"}


@router.get("/check-auth")
def check_auth(request: Request, db: Session = Depends(connect_db)):
    print(request.cookies, "cookies here")
    token = request.cookies.get("token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    payload = verify_cookie_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    email = payload.get("email")
    id = payload.get('id')

    user = db.query(Employee).filter(Employee.employee_id == id).first()

    return {"message": "Authenticated", "user": user, "email": email}