from pydantic import BaseModel, EmailStr

class EmployeeBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str | None = None
    