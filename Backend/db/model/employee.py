from sqlalchemy import Column, Integer, String, Date, DateTime, Float, ForeignKey, Enum, Text, Boolean
from sqlalchemy.sql import func
from db.database import Base
import enum


class RoleEnum(enum.Enum):
    cashier = "cashier"
    manager = "manager"
    stock_clerk = "stock"
class Employee(Base):
    __tablename__ = "employees"
    
    employee_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    firstName = Column(String(100), nullable=False)
    lastName = Column(String(100), nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    salary = Column(Float(10, 2),nullable=False)
    hire_date = Column(Date,nullable=False)
    phone = Column(String(20),nullable=False)
    address = Column(String(20), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.employee_id",ondelete="CASCADE"))
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    last_login = Column(DateTime)
    token = Column(String(255), nullable=True)
    is_authenticated = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())

class EmployeeShift(Base):
    __tablename__ = "employee_shifts"
    
    shift_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.employee_id",ondelete="CASCADE"))
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    date = Column(Date, nullable=False)