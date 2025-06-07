import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";
import { api } from "@/lib/api";

const ResetPasswordPage = () => {
  const { id } = useParams();
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  const handleChange = async (data) => {
    const { password, confirmPassword } = data;
    if (confirmPassword !== password) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);

      try {
        const response = await api.post("/auth/set-password", {
          password,
          token: id,
        });
        navigate("/login");
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 justify-center items-center bg-white rounded-3xl shadow-2xl overflow-hidden w-2/5">
      <img src="/reset.png" className="size-16" alt="Forgot Password" />
      <div className="flex flex-row gap-2 justify-between items-center font-serif font-bold w-full">
        <span className="bg-[#D6DDEB] h-[1px] w-1/4"></span>
        <div className="text-[#abaeb3]">RESET YOUR PASSWORD</div>
        <span className="bg-[#D6DDEB] h-[1px] w-1/4"></span>
      </div>
      <form
        className="flex flex-col gap-4 justify-center w-3/4"
        onSubmit={handleSubmit(handleChange)}
      >
        <div className="relative w-full">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="password"
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Enter new password"
            onChange={() => {
              setPasswordMismatch(false);
              form.clearErrors("password");
            }}
            className="border border-[#D6DDEB] rounded-xl p-2 pl-12 w-full"
          />
        </div>

        <div className="relative w-full">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Confirm new password"
            onChange={() => {
              form.clearErrors("confirmPassword");
              setPasswordMismatch(false);
            }}
            className="border border-[#D6DDEB] rounded-xl p-2 pl-12 w-full"
          />
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
        {passwordMismatch && (
          <p className="text-red-500 text-sm">
            Passwords do not match. Please try again.
          </p>
        )}

        <button
          className="rounded-full bg-gray-600 text-white p-2 w-full cursor-pointer"
          type="submit"
        >
          Confirm
        </button>
        <div className="flex flex-row text-sm justify-center text-gray-500 gap-1">
          <p>Go back to</p>
          <a href="/login" className="text-blue-500 font-bold">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
