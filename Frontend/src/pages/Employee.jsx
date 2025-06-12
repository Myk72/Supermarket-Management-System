import React, { useEffect } from "react";
import { CustomTable } from "@/components/table/Table";
import EmployeeColumns from "@/components/columns/Employee";
import { useEmployeeStore } from "@/store/employee.store";
import { useNavigate } from "react-router-dom";
const Employee = () => {
  const { employees, fetchEmployees, deleteEmployee } = useEmployeeStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <div className="space-y-3 font-serif">
      <h1 className="text-xl font-semibold text-blue-900">Employees</h1>
      <CustomTable
        columns={EmployeeColumns}
        data={employees}
        addButtonText={"Add New Employee"}
        onAddClick={() => {
          navigate("/employees/add");
        }}
        meta={{
          onAssignClick: (employee) => {
            navigate(`/employees/assign/${employee.employee_id}`);
          },
          onDeleteClick: (employee) => {
            deleteEmployee(employee.employee_id);
          },
        }}
      />
    </div>
  );
};

export default Employee;
