import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import useAuthStore from "@/store/auth.store";
import toast, { Toaster } from "react-hot-toast";

const DetailProfile = () => {
  const form = useForm();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  const { updateProfile, user: userProfile } = useAuthStore();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (userProfile) {
      reset({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address,
        role: userProfile.role,
        salary: userProfile.salary,
        hire_date: userProfile.hire_date,
      });
    }
  }, [userProfile, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await updateProfile(userProfile.employee_id, data);
      if (response.data) {
        toast.success("Profile updated successfully!");
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="py-4 px-2 font-serif">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-900">
          Profile Settings
        </h2>
        {!editMode ? (
          <Button
            variant="outline"
            className="text-sm text-blue-600"
            onClick={() => setEditMode(true)}
          >
            <Edit className="size-4 " />
          </Button>
        ) : null}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6 text-sm"
      >
        <div className="flex flex-col gap-2">
          <label>First Name</label>
          <input
            {...register("firstName", { required: "First name is required" })}
            disabled={!editMode}
            className="p-2 border rounded-md"
          />
          {errors.firstName && (
            <span className="text-red-500 text-xs">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            disabled={!editMode}
            className="p-2 border rounded-md"
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
            disabled={!editMode}
            className="p-2 border rounded-md"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Phone</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?\d{7,14}$/,
                message: "Invalid phone number",
              },
            })}
            disabled={!editMode}
            className="p-2 border rounded-md"
          />
          {errors.phone && (
            <span className="text-red-500 text-xs">{errors.phone.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <label>Address</label>
          <input
            {...register("address", { required: "Address is required" })}
            disabled={!editMode}
            className="p-2 border rounded-md w-full"
          />
          {errors.address && (
            <span className="text-red-500 text-xs">
              {errors.address.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Role</label>
          <input
            {...register("role")}
            disabled
            className="p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Salary</label>
          <input
            {...register("salary")}
            disabled
            className="p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <label>Hire Date</label>
          <input
            type="date"
            {...register("hire_date")}
            disabled
            className="p-2 border rounded-md bg-gray-100 cursor-not-allowed w-full"
          />
        </div>

        {editMode && (
          <div className="col-span-2 flex justify-end mt-4">
            <Button
              variant="default"
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DetailProfile;
