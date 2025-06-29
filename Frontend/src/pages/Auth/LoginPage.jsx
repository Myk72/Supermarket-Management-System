import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, forgotpassword, loading } = useAuthStore();
  const navigate = useNavigate();
  const [forgotPasswordIsOpen, setForgotPasswordIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response.data) {
        toast.success("Login successful!");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.detail);
      toast.error(
        error.response?.data?.detail || "Login failed. Please try again."
      );
    }
  };

  useEffect(() => {
    if (loading) {
      toast.loading("Loading...");
    } else {
      toast.dismiss();
    }
  }, [loading]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg font-serif gap-4">
      <Toaster />
      <div className="flex justify-center items-center flex-col gap-1">
        <h1 className="text-2xl font-black text-blue-600">Welcome Back!</h1>
        <span className="text-sm font-light text-blue-600">
          Login to your account
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 space-y-4">
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

        <div
          className="flex justify-end font-semibold text-xs text-blue-600 cursor-pointer -mt-2 mb-2"
          onClick={() => setForgotPasswordIsOpen(true)}
        >
          <span>Forgot Password?</span>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        >
          Login
        </Button>
      </form>

      <Dialog
        open={forgotPasswordIsOpen}
        onOpenChange={setForgotPasswordIsOpen}
      >
        <DialogContent className="sm:max-w-md bg-gray-100">
          <DialogHeader>
            <DialogTitle>Forgot your password?</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2 font-serif">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="py-2 px-4 border rounded-xl border-black"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <Button
            variant={"default"}
            className={
              "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            }
            onClick={async () => {
              try {
                const resp = await forgotpassword(email);
                if (resp.data) {
                  toast.success("Reset link sent to your email!");
                }
                setForgotPasswordIsOpen(false);
              } catch {
                toast.error("Failed to send reset link. Please try again.");
              }
            }}
          >
            Send Reset Link
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginPage;
