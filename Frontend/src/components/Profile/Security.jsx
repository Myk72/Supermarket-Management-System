import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import useAuthStore from "@/store/auth.store";

const Security = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { changePassword, user } = useAuthStore();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const { old_password, new_password } = data;
    try {
      const response = await changePassword(
        old_password,
        new_password,
        user?.employee_id
      );
      if (response.data) {
        alert("Password changed successfully!");
      } else {
        setError("Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="px-2 py-4 bg-white font-serif space-y-4">
      <h2 className="text-2xl font-bold ">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col gap-2">
          <label className=" text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            id="old_password"
            type="password"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            {...register("old_password", {
              required: "Current password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            {...register("new_password", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: (value) =>
                value !== watch("old_password") ||
                "New password must be different from current password",
            })}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium ">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === watch("new_password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            variant="default"
            type="submit"
            className="w-1/5 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer"
          >
            Update
          </Button>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Security;
