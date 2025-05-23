import React from "react";
import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    navigate("/dashboard");
  };
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <header className="flex items-center w-full py-4 px-6 text-white space-x-2">
        <ShoppingCart className="w-16 h-16 text-blue-900" />
        <h1 className="text-2xl font-bold text-blue-900">SuperMarket MS</h1>
      </header>

      <div className="flex flex-row items-center w-full h-screen gap-16 p-4">
        <div className="flex justify-center items-center w-1/2 shrink-0">
          <img
            src="/Shopping.png"
            alt="Login"
            className="w-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg font-serif gap-4 w-1/3">
          <div className="flex justify-center items-center flex-col gap-1">
            <h1 className="text-2xl font-black text-blue-600">
              Welcome Back!
            </h1>
            <span className="text-sm font-light text-blue-600">
              Login to your account
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full p-2 border rounded-lg ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <span className="text-red-500">
                  {errors.email.type === "required"
                    ? "Email is required"
                    : errors.email.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full p-2 border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <span className="text-red-500">
                  {errors.password.type === "required"
                    ? "Password is required"
                    : errors.password.message}
                </span>
              )}
            </div>

            <div className="flex justify-end font-semibold text-xs text-blue-600 cursor-pointer -mt-2 mb-2">
              <span>Forgot Password?</span>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
