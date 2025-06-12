from pydantic import BaseModel, EmailStr
from datetime import date

class CustomerBase(BaseModel):
    firstName: str
    lastName: str
    phone: str
    email: EmailStr
    dateOfBirth: date
    address: str
    idType: str
    idNumber: str