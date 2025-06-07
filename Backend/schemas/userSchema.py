from pydantic import BaseModel, EmailStr
from datetime import date

class EmployeeBase(BaseModel):
    firstName: str
    lastName: str
    role: str
    salary: float
    hire_date: date
    phone: str
    address: str | None = None
    token: str | None = None
    is_authenticated: bool = False

class UserRegister(EmployeeBase):
    email: EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class SetPasswordRequest(BaseModel):
    token: str
    password: str
