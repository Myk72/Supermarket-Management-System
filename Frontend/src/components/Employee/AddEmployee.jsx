import React from "react";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col justify-center font-serif gap-2 bg-white rounded-2xl p-10">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="bg-gray-50 hover:bg-gray-200"
          onClick={() => {
            window.history.back();
          }}
        >
          <FaArrowLeft className="size-4" />
          Back
        </Button>
      </div>
      <div className="flex justify-center items-center flex-col gap-4">
        <h1 className="font-semibold text-2xl text-blue-500">
          Add New Employee
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="firstName" className="text-sm font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  className="w-full p-2 border rounded-lg border-gray-300"
                  {...register("firstName", {
                    required: true,
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Only letters are allowed",
                    },
                  })}
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  className="w-full p-2 border rounded-lg border-gray-300"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter phone number"
                  className="w-full p-2 border rounded-lg border-gray-300"
                  {...register("phone", {
                    required: true,
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  })}
                />
              </div>
              <div>
                <label htmlFor="address" className="text-sm font-semibold">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter address"
                  className="w-full p-2 border rounded-lg border-gray-300"
                  {...register("address", {
                    required: true,
                    pattern: {
                      value: /^[A-Za-z0-9\s,.-]+$/,
                      message:
                        "Only letters, numbers, and basic symbols are allowed",
                    },
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="lastName" className="text-sm font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  className="w-full p-2 border rounded-lg border-gray-300"
                  {...register("lastName", {
                    required: true,
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Only letters are allowed",
                    },
                  })}
                />
              </div>
              <div>
                <label htmlFor="role" className="text-sm font-semibold">
                  Role
                </label>
                <select
                  id="role"
                  className="w-full p-2 border rounded-lg border-gray-300"
                  {...register("role", {
                    required: true,
                  })}
                >
                  <option value="manager">Manager</option>
                  <option value="stock_clerk">Stock Clerk</option>
                  <option value="cashier">Cashier</option>
                </select>
              </div>
              <div>
                <label htmlFor="salary" className="text-sm font-semibold">
                  Salary
                </label>
                <input
                  type="number"
                  id="salary"
                  placeholder="Enter salary"
                  className="w-full p-2 border rounded-lg border-gray-300"
                  {...register("salary", {
                    required: true,
                    min: {
                      value: 0,
                      message: "Salary must be a positive number",
                    },
                  })}
                />
              </div>

              <div>
                <label htmlFor="hireDate" className="text-sm font-semibold">
                  Hire Date
                </label>
                <input
                  type="date"
                  id="hireDate"
                  className="w-full p-2 border rounded-lg border-gray-300"
                  {...register("hireDate", {
                    required: true,
                    validate: (value) => {
                      const today = new Date();
                      const hireDate = new Date(value);
                      return hireDate <= today;
                    },
                  })}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant={"outline"}
              className="ml-2 bg-blue-500 text-white hover:bg-blue-600"
              type="submit"
            >
              Add New Employee
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
