import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center p-10 text-blue-900 font-serif text-center">
      <h1 className="text-4xl font-bold mb-10">Welcome to SuperMarket MS</h1>
      <p className="text-lg mb-10">
        SuperMarket MS helps you manage your supermarket easily. Keep track
        inventory, handle sales, manage suppliers, and more. All in one place -
        It's simple, secure, and saves you time.
      </p>
      <Button
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        onClick={() => navigate("/login")}
      >
        Get Started
      </Button>
    </div>
  );
};

export default Home;
