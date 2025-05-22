import React, { useEffect } from "react";
import { CustomTable } from "@/components/table/Table";
import EmployeeColumns from "@/components/columns/Employee";
import { useEmployeeStore } from "@/store/employee.store";
const Employee = () => {
  const { employees, fetchEmployees } = useEmployeeStore();
  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold text-blue-900">List Of All Employees</h1>
      <CustomTable columns={EmployeeColumns} data={employees} />
    </div>
  );
};

export default Employee;
