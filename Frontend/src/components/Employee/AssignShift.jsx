import React from "react";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const AssignShift = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col font-serif gap-2 bg-white rounded-2xl p-10">
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
      <div className="flex justify-start items-start flex-col gap-4 w-1/2">
        <h1 className="font-semibold text-2xl text-blue-500">
          Assign New Shift to Employee {id}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          <div>
            <label htmlFor="startTime" className="text-sm font-semibold">
              Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              className="w-full p-2 border rounded-lg border-gray-300"
              {...register("startTime", { required: true })}
            />
            {errors.startTime && (
              <span className="text-red-500 text-sm">
                Start time is required
              </span>
            )}
          </div>
          <div>
            <label htmlFor="endTime" className="text-sm font-semibold">
              End Time
            </label>
            <input
              type="datetime-local"
              id="endTime"
              className="w-full p-2 border rounded-lg border-gray-300"
              {...register("endTime", { required: true })}
            />
            {errors.endTime && (
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
            />
            {errors.date && (
              <span className="text-red-500 text-sm">Date is required</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignShift;
