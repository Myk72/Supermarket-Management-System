from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import date

class EmployeeBase(BaseModel):
    employee_id: Optional[int] = None
    firstName: str
    lastName: str
    role: str
    salary: float
    hire_date: date
    phone: str
    address: str

    model_config = ConfigDict(from_attributes=True)

class EmployeeUser(EmployeeBase):
    email: Optional[EmailStr] = None

    model_config = ConfigDict(from_attributes=True)

class UserRegister(EmployeeBase):
    email: EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class SetPasswordRequest(BaseModel):
    token: str
    password: str

class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str


class ForgotPasswordRequest(BaseModel):
    email: str
