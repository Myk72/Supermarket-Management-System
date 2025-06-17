from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel, ConfigDict
from schemas.userSchema import UserRegister, EmployeeUser
from db.model.employee import User, Employee, EmployeeShift
from db.database import connect_db
from datetime import datetime, time, date

router = APIRouter(prefix="/users", tags=["Users"])

class EmployeeUpdate(BaseModel):
    firstName: str
    lastName: str
    phone: str
    address: str
    email: str

    model_config = ConfigDict(from_attributes=True)

class EmployeeShiftSchema(BaseModel):
    employee_id: int
    start_time: time
    end_time: time
    date: date

    model_config = ConfigDict(from_attributes=True)

class EmployeeShiftResponse(EmployeeShiftSchema):
    employee : EmployeeUser

    model_config = ConfigDict(from_attributes=True)




@router.get("/", response_model=list[EmployeeUser])
async def get_all_employees(db: Session = Depends(connect_db)):
    employees = db.query(Employee).options(joinedload(Employee.user)).all()
    
    return [
        EmployeeUser(
            employee_id=employee.employee_id,
            firstName=employee.firstName,
            lastName=employee.lastName,
            role=employee.role,
            salary=employee.salary,
            hire_date=employee.hire_date,
            phone=employee.phone,
            address=employee.address,
            email=employee.user.email if employee.user else None 
        )
        for employee in employees
    ]

@router.get("/{id}", response_model=EmployeeUser)
async def get_employee_by_id(id: int, db: Session = Depends(connect_db)):
    employee = db.query(Employee).options(joinedload(Employee.user)).filter(Employee.employee_id == id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    return EmployeeUser(
        employee_id=employee.employee_id,
        firstName=employee.firstName,
        lastName=employee.lastName,
        role=employee.role,
        salary=employee.salary,
        hire_date=employee.hire_date,
        phone=employee.phone,
        address=employee.address,
        email=employee.user.email if employee.user else None 
    )


@router.delete("/{id}")
async def delete_employee(id: int, db: Session = Depends(connect_db)):
    print(id)
    employee = db.query(Employee).filter(Employee.employee_id == id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # print(employee,"here")
    
    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted successfully"}

@router.put("/{id}")
async def update_employee(id: int, employee_data : EmployeeUpdate, db: Session = Depends(connect_db)):
    employee = db.query(Employee).filter(Employee.employee_id == id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    # firstName, lastName, phone , address, email
    employee.firstName = employee_data.firstName
    employee.lastName = employee_data.lastName
    employee.phone = employee_data.phone
    employee.address = employee_data.address

    user = db.query(User).filter(User.employee_id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.email = employee_data.email

    db.commit()
    db.refresh(employee)
    db.refresh(user)
    return EmployeeUser(
        employee_id=employee.employee_id,
        firstName=employee.firstName,
        lastName=employee.lastName,
        role=employee.role,
        salary=employee.salary,
        hire_date=employee.hire_date,
        phone=employee.phone,
        address=employee.address,
        email=user.email
    )


@router.post("/assign-shift")
async def create_employee_shift(shift_data: EmployeeShiftSchema, db: Session = Depends(connect_db)):
    employee = db.query(Employee).filter(Employee.employee_id == shift_data.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    new_shift = EmployeeShift(
        employee_id=shift_data.employee_id,
        start_time=shift_data.start_time,
        end_time=shift_data.end_time,
        date=shift_data.date
    )

    db.add(new_shift)
    db.commit()
    db.refresh(new_shift)

    return {"message": "Shift assigned", "shift_id": new_shift.shift_id}

@router.get("/{id}/shifts", response_model=list[EmployeeShiftResponse])
async def get_employee_shifts(id: int, db: Session = Depends(connect_db)):
    employee = db.query(Employee).filter(Employee.employee_id == id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    shifts = db.query(EmployeeShift).filter(EmployeeShift.employee_id == id).all()

    return [
        EmployeeShiftResponse(
            employee_id=shift.employee_id,
            start_time=shift.start_time,
            end_time=shift.end_time,
            date=shift.date,
            employee=EmployeeUser(
                employee_id=employee.employee_id,
                firstName=employee.firstName,
                lastName=employee.lastName,
                role=employee.role,
                salary=employee.salary,
                hire_date=employee.hire_date,
                phone=employee.phone,
                address=employee.address,
                email=employee.user.email if employee.user else None
            )
        )
        for shift in shifts
    ]