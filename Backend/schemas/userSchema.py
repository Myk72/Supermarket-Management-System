from pydantic import BaseModel, EmailStr
from datetime import date

class EmployeeBase(BaseModel):
    firstName: str
    lastName: str
    role: str
    salary: float
    hire_date: date
    phone: str

class UserRegister(EmployeeBase):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str
