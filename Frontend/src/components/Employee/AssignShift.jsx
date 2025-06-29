import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEmployeeStore } from "@/store/employee.store";
import toast, { Toaster } from "react-hot-toast";

const AssignShift = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employee_id: parseInt(id),
      start_time: "",
      end_time: "",
      date: "",
    },
  });
  const { assignShift, isLoading } = useEmployeeStore();

  const onSubmit = async (data) => {
    try {
      const response = await assignShift(data);
      if (response) {
        toast.success("Shift assigned successfully");
      }
    } catch (error) {
      console.error("Error assigning shift:", error.message);
      toast.error("Failed to assign shift. Please try again.");
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Assigning shift...");
    } else {
      toast.dismiss();
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col font-serif gap-2 bg-white rounded-2xl p-10">
      <Toaster />
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
          Assign New Shift to Employee {id}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-1/2"
        >
          <div>
            <label htmlFor="startTime" className="text-sm font-semibold">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              className="w-full p-2 border rounded-lg border-gray-300"
              {...register("start_time", {
                required: true,
                validate: (value) => {
                  const endTime = watch("end_time");

                  if (!endTime) return true;
                  const start = new Date(`1970-01-01T${value}:00`);
                  const end = new Date(`1970-01-01T${endTime}:00`);
                  return start < end || "Start time must be before end time";
                },
              })}
            />
            {errors.start_time && (
              <span className="text-red-500 text-sm">
                {errors.start_time.message || "Start time is required"}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="endTime" className="text-sm font-semibold">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              className="w-full p-2 border rounded-lg border-gray-300"
              {...register("end_time", { required: true })}
            />
            {errors.end_time && (
              <span className="text-red-500 text-sm">End time is required</span>
            )}
          </div>
          <div>
            <label htmlFor="date" className="text-sm font-semibold">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full p-2 border rounded-lg border-gray-300"
              {...register("date", { required: true })}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.date && (
              <span className="text-red-500 text-sm">Date is required</span>
            )}
          </div>

          <Button
            variant={"outline"}
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
          >
            Assign Shift
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AssignShift;
